import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Header, Icon} from "semantic-ui-react";
import axios from "axios";

import {useStateValue} from "../state";
import {apiBaseUrl} from "../constants";
import {Gender} from "../types";


const PatientPage: React.FC = () => {
    const history = useHistory();
    const {id} = useParams<{ id: string }>();
    const [{patients}, dispatch] = useStateValue();
    const patient = patients[id];

    useEffect(() => {
        if (!patient || !patient.ssn) {
            axios.get(`${apiBaseUrl}/patients/${id}`)
                .then(res => dispatch({type: "UPDATE_PATIENT", payload: res.data}))
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

    if (!patient) return null;
    return (
        <div className="App">
            <Header as="h1">
                {patient.name}
                {getGenderIcon(patient.gender)}
            </Header>
            {`ssn: ${patient.ssn}`}<br/>
            {`occupation: ${patient.occupation}`}
        </div>
    );
};

export default PatientPage;
