import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Header, Icon} from "semantic-ui-react";
import axios from "axios";

import {updatePatient, useStateValue} from "../state";
import {apiBaseUrl} from "../constants";
import {Entry, Gender} from "../types";


const PatientPage: React.FC = () => {
    const history = useHistory();
    const {id} = useParams<{ id: string }>();
    const [{patients}, dispatch] = useStateValue();
    const patient = patients[id];

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

    const getEntry = (entry: Entry) => (
        <div key={entry.id}>
            {`${entry.date} ${entry.description}`}
            <ul>
                {entry.diagnosisCodes?.map((dc: string) => <li key={dc}>{dc}</li>)}
            </ul>
        </div>
    );

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
            {patient.entries.map(entry => getEntry(entry))}
        </div>
    );
};

export default PatientPage;
