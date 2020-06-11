import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Button, Header, Icon} from "semantic-ui-react";
import axios from "axios";

import EntryDetails from "./EntryDetails";
import {updatePatient, useStateValue} from "../state";
import {apiBaseUrl} from "../constants";
import {Entry, Gender} from "../types";
import {EntryFormValues} from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";


const PatientPage: React.FC = () => {
  const history = useHistory();
  const {id} = useParams<{ id: string }>();
  const [{patients}, dispatch] = useStateValue();
  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const newPatient = {...patient, entries: patient.entries.concat(newEntry)};
      dispatch(updatePatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    if (!patient || !patient.ssn) {
      axios.get(`${apiBaseUrl}/patients/${id}`)
        .then(res => dispatch(updatePatient(res.data)))
        .catch(e => {
          console.error(e.response.data);
          history.push('/');
        });
    }
  }, [patient, id, dispatch, history]);

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
    case Gender.Male:
      return <Icon name='mars'/>;
    case Gender.Female:
      return <Icon name='venus'/>;
    case Gender.Other:
      return <Icon name='neuter'/>;
    default:
      return assertNever(gender);
    }
  };

  if (!patient || !patient.ssn) return null;
  return (
    <div className="App">
      <Header as="h1">
        {patient.name}
        {getGenderIcon(patient.gender)}
      </Header>
      {`ssn: ${patient.ssn}`}<br/>
      {`occupation: ${patient.occupation}`}
      <Header as="h3">entries</Header>
      {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/> )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
