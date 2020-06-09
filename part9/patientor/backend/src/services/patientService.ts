import {v4 as uuidv4} from 'uuid';
import {NewPatient, Patient, PublicPatient} from "../types";

import patientData from '../../data/patients';
import {toNewPatient} from "../utils";

const patients: Patient[] = patientData.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
});

const getAllPatients = (): PublicPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.filter((p) => p.id === id)[0];
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
    getAllPatients,
    getPatient,
    addPatient
};
