/* eslint-disable @typescript-eslint/no-explicit-any */
import {Entry, Gender, NewPatient} from "../types";
import {isString, isArray, isDate} from "./commonUtils";

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntry = (param : any): param is Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {type} = param;
    return [
        "HealthCheck",
        "Hospital",
        "OccupationalHealthcare"
    ].includes(type);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dateOfBirth;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseEntry = (entry: any): Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!entry || !isEntry(entry)) {
        throw new Error('Incorrect entry');
    }
    return entry;
};

const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
        return [];
    }
    if(!isArray(entries)) {
        throw new Error('Incorrect entries');
    }
    return entries.map(e => parseEntry(e));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {name, dateOfBirth, ssn, gender, occupation, entries} = object;
    return {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };
};
