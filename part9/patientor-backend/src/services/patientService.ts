import {v4 as uuidv4} from 'uuid';
import {NewPatient, Patient, PatientNonSensitive} from "../types";

import patientData from '../data/patients.json';
import {toNewPatient} from "../utils";

const patients: Patient[] = patientData.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
});

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatientsNonSensitive,
    addPatient
};
