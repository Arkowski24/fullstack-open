import React from "react";
import {Segment, Header, Icon, SemanticCOLORS, List} from "semantic-ui-react";

import {Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from "../types";
import {useStateValue} from "../state";


const DiagnosisCodes: React.FC<{entry: Entry}> = ({entry}) => {
  const [{diagnoses}] = useStateValue();

  const getCodeDetail = (diagnosisCode: string) => (
    <List.Item key={diagnosisCode}>
      {diagnoses[diagnosisCode] ? `${diagnosisCode} - ${diagnoses[diagnosisCode].name}` : diagnosisCode}
    </List.Item>
  );

  if(!entry.diagnosisCodes) return null;
  return (
    <div>
      Diagnosis codes:
      <List bulleted>
        {entry.diagnosisCodes.map((dc: string) => getCodeDetail(dc))}
      </List>
    </div>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({entry}) => {
  return (
    <Segment>
      <Header as="h4">
        {entry.date}
        <Icon name='hospital'/>
      </Header>
      <em>{entry.description}</em><br/>
      <DiagnosisCodes entry={entry}/>
      {`Discharge: ${entry.discharge.date} - ${entry.discharge.criteria}`}
    </Segment>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry}) => {
  return (
    <Segment>
      <Header as="h4">
        {entry.date}
        <Icon name='stethoscope'/>
        {entry.employerName}
      </Header>
      <em>{entry.description}</em><br/>
      <DiagnosisCodes entry={entry}/>
      {entry.sickLeave && `Sick leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}
    </Segment>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
  const healthColors = ['green', 'orange', 'red', 'purple'] as Array<SemanticCOLORS>;
  return (
    <Segment>
      <Header as="h4">
        {entry.date}
        <Icon name='user md'/>
      </Header>
      <em>{entry.description}</em><br/>
      <DiagnosisCodes entry={entry}/>
      <Icon name='heart' color={healthColors[entry.healthCheckRating]}/>
    </Segment>
  );
};

const assertNever = (value: never): never => {
  throw Error(`Non exhaustive entry type: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
  switch (entry.type) {
  case "Hospital":
    return <HospitalEntryDetails entry={entry}/>;
  case "OccupationalHealthcare":
    return <OccupationalHealthcareEntryDetails entry={entry}/>;
  case "HealthCheck":
    return <HealthCheckEntryDetails entry={entry}/>;
  default:
    return assertNever(entry);
  }
};

export default EntryDetails;
