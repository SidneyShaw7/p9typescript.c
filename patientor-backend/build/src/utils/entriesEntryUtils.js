"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
// const parseString = (value: unknown, fieldName: string): string => {
//   if (!isString(value)) {
//     throw new Error(`Incorrect or missing ${fieldName}`);
//   }
//   return value;
// };
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
// HANDLE BASE-ENTRY TYPEGUARDS
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error('Incorrect or missing description.');
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist))
        throw new Error('Incorrect or missing specialist.');
    return specialist;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
// HANDLE HEALTH-CHECK-ENTRY TYPEGUARDS
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating) => {
    if (!isHealthCheckRating(rating))
        throw new Error('Invalid Health Check Rating');
    return rating;
};
const parseHealthCheckEntry = (objectEntry) => {
    if (!objectEntry || typeof objectEntry !== 'object')
        throw new Error('Incorrect or missing entry');
    if ('description' in objectEntry &&
        'date' in objectEntry &&
        'specialist' in objectEntry &&
        'diagnosisCodes' in objectEntry &&
        'type' in objectEntry &&
        'healthCheckRating' in objectEntry &&
        typeof objectEntry.healthCheckRating === 'number') {
        const newEntriesEntry = {
            description: parseDescription(objectEntry.description),
            date: parseDate(objectEntry.date),
            specialist: parseSpecialist(objectEntry.specialist),
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(objectEntry.healthCheckRating),
        };
        if ('diagnosisCodes' in objectEntry)
            parseDiagnosisCodes(objectEntry.diagnosisCodes);
        return newEntriesEntry;
    }
    throw new Error('Incorrect data: a field is missing.');
};
const parseEmployerName = (employerName) => {
    if (!isString(employerName))
        throw new Error('Incorrect or missing Employer Name');
    return employerName;
};
const isSickLeave = (sickLeave) => {
    return (sickLeave && isString(sickLeave.startDate) && isString(sickLeave.endDate));
};
const parseSickLeave = (sickLeave) => {
    if (typeof sickLeave === 'object' &&
        sickLeave !== null &&
        isSickLeave(sickLeave)) {
        return sickLeave;
    }
    throw new Error('Invalid Sick Leave entry');
};
const parseOccupationalHealthcareEntry = (objectEntry) => {
    if (!objectEntry || typeof objectEntry !== 'object')
        throw new Error('Incorrect or missing entry');
    if ('description' in objectEntry &&
        'date' in objectEntry &&
        'specialist' in objectEntry &&
        'diagnosisCodes' in objectEntry &&
        'type' in objectEntry &&
        'employerName' in objectEntry) {
        const newEntriesEntry = {
            description: parseDescription(objectEntry.description),
            date: parseDate(objectEntry.date),
            specialist: parseSpecialist(objectEntry.specialist),
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(objectEntry.employerName),
        };
        if ('diagnosisCodes' in objectEntry)
            parseDiagnosisCodes(objectEntry.diagnosisCodes);
        if ('sickLeave' in objectEntry)
            parseSickLeave(objectEntry.sickLeave);
        return newEntriesEntry;
    }
    throw new Error('Incorrect data: a field is missing.');
};
const isDischarge = (discharge) => {
    return discharge && isString(discharge.criteria) && isString(discharge.date);
};
const parseDischarge = (discharge) => {
    if (typeof discharge === 'object' &&
        discharge !== null &&
        isDischarge(discharge)) {
        return discharge;
    }
    throw new Error('Invalid Discharge entry');
};
const parseHospitalEntry = (objectEntry) => {
    if (!objectEntry || typeof objectEntry !== 'object')
        throw new Error('Incorrect or missing entry');
    if ('description' in objectEntry &&
        'date' in objectEntry &&
        'specialist' in objectEntry &&
        'diagnosisCodes' in objectEntry &&
        'type' in objectEntry &&
        'discharge' in objectEntry) {
        const newEntriesEntry = {
            description: parseDescription(objectEntry.description),
            date: parseDate(objectEntry.date),
            specialist: parseSpecialist(objectEntry.specialist),
            type: 'Hospital',
            discharge: parseDischarge(objectEntry.discharge),
        };
        return newEntriesEntry;
    }
    throw new Error('Incorrect data: a field is missing.');
};
const toNewEntry = (object) => {
    if (typeof object !== 'object' || object === null || !('type' in object)) {
        throw new Error('Incorrect or missing entry');
    }
    const entryObject = object;
    switch (entryObject.type) {
        case 'HealthCheck':
            return parseHealthCheckEntry(object);
        case 'OccupationalHealthcare':
            return parseOccupationalHealthcareEntry(object);
        case 'Hospital':
            return parseHospitalEntry(object);
        default:
            throw new Error('Incorrect or missing type');
    }
};
exports.default = toNewEntry;
