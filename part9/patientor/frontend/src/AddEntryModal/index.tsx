import React, {useState} from 'react';
import {Modal, Segment, Button} from 'semantic-ui-react';

import AddHealthCheckEntryForm, {HealthCheckEntryFormValues} from './AddHealthCheckEntryForm';
import AddHospitalEntryForm, {HospitalEntryFormValues} from "./AddHospitalEntryForm";
import {Entry} from "../types";

export type EntryFormValues =
    | HospitalEntryFormValues
    | HealthCheckEntryFormValues;

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}

const AddEntryModal = ({modalOpen, onClose, onSubmit, error}: Props) => {
  const [entryType, setEntryType] = useState<Entry['type']>('HealthCheck');
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Button.Group>
          <Button
            active={entryType === 'HealthCheck'}
            onClick={() => setEntryType('HealthCheck')}
          >
            Health Check
          </Button>
          <Button
            active={entryType === 'Hospital'}
            onClick={() => setEntryType('Hospital')}
          >
            Hospital
          </Button>
        </Button.Group>
        {entryType === 'HealthCheck' && <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose}/>}
        {entryType === 'Hospital' && <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose}/>}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
