import patientData from '../data/patients.json';
import {Patient, PatientNonSensitive} from "../types";

const patients: Patient[] = patientData as Patient[];

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
    return patients.map(({    id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatientsNonSensitive
};
