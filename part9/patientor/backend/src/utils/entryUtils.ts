/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
import {
    Diagnosis, Discharge, HealthCheckRating,
    NewEntry,
    NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, SickLeave,
} from "../types";
import {isArray, isDate, isNumber, isString} from "./commonUtils";

const isHealthCheckRating = (param : number): param is HealthCheckRating =>
    Object.values(HealthCheckRating).includes(param);

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseDate = (date: any): string => {
    if(!date || !isString(date) ||  !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist: any): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseDiagnosisCode = (diagnosisCode: any): Diagnosis['code'] => {
    if(!diagnosisCode || !isString(diagnosisCode)) {
        throw new Error('Incorrect or missing diagnosis code');
    }
    return diagnosisCode;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> | undefined => {
    if(diagnosisCodes === undefined) return undefined;
    if(!isArray(diagnosisCodes)){throw new Error('Incorrect diagnosis codes');}
    return diagnosisCodes.map(dc => parseDiagnosisCode(dc));
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing diagnosis code');
    }
    return healthCheckRating;
};

const parseEmployerName = (employerName: any): string => {
    if(!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
    if (sickLeave === undefined) return undefined;
    if (!sickLeave) {throw new Error('Incorrect sick leave');}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {startDate, endDate} = sickLeave;
    return {
        startDate: parseDate(startDate),
        endDate: parseDate(endDate)
    };
};

const parseDischargeCriteria = (dischargeCriteria: any): string => {
    if(!dischargeCriteria || !isString(dischargeCriteria)) {
        throw new Error('Incorrect or missing discharge criteria');
    }
    return dischargeCriteria;
};

const parseDischarge = (discharge: any): Discharge => {
    if(!discharge) {throw new Error('Missing discharge');}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {date, criteria} = discharge;
    return {
        date: parseDate(date),
        criteria: parseDischargeCriteria(criteria)
    };
};


export const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {description, date, specialist, diagnosisCodes, healthCheckRating} = object;
    return {
        type: "HealthCheck",
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
    };
};

export const toNewHospitalEntry = (object: any): NewHospitalEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {description, date, specialist, diagnosisCodes, discharge} = object;
    return {
        type: "Hospital",
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge)
    };
};

export const toNewOccupationalHealthcareEntry = (object: any): NewOccupationalHealthcareEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {description, date, specialist, diagnosisCodes, employerName, sickLeave} = object;
    return {
        type: "OccupationalHealthcare",
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave)
    };
};

export const toNewEntry = (object: any): NewEntry => {
    if (!object) {throw Error('Missing entry.');}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {type} = object;
    switch (type) {
        case "HealthCheck":
            return toNewHealthCheckEntry(object);
        case "Hospital":
            return toNewHospitalEntry(object);
        case "OccupationalHealthcare":
            return toNewOccupationalHealthcareEntry(object);
        default:
            throw Error(`Unknown entry type: ${JSON.stringify(type)}`);
    }
};
