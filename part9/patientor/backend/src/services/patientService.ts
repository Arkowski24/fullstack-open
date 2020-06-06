import {v4 as uuidv4} from 'uuid';
import {NewPatient, Patient, PatientNonSensitive} from "../types";
import patientData from '../data/patients.json';

const patients: Patient[] = patientData as Patient[];

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
