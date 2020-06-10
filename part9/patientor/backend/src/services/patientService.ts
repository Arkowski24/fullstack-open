import {v4 as uuidv4} from 'uuid';
import {Entry, NewEntry, NewPatient, Patient, PublicPatient} from "../types";

import patientData from '../../data/patients';
import {toNewPatient} from "../utils/patientUtils";

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

const addPatientEntry = (id: string, entry: NewEntry): Entry => {
    const patient = patients.find(p => p.id === id);
    if(!patient) {throw Error("Patient not found");}
    const newEntry = {
        id: uuidv4(),
        ...entry
    };
    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getAllPatients,
    getPatient,
    addPatient,
    addPatientEntry
};
