"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
// HANDLE BASE-ENTRY TYPEGUARDS
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
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
const toNewEntry = (objectEntry) => {
    if (typeof objectEntry !== 'object' ||
        objectEntry === null ||
        !('type' in objectEntry)) {
        throw new Error('Incorrect or missing entry type');
    }
    const entry = objectEntry;
    if ('description' in entry &&
        'date' in entry &&
        'specialist' in entry &&
        'type' in entry) {
        const baseEntry = {
            description: parseDescription(entry.description),
            date: parseDate(entry.date),
            specialist: parseSpecialist(entry.specialist),
            diagnosisCodes: entry.diagnosisCodes
                ? parseDiagnosisCodes(entry.diagnosisCodes)
                : undefined,
        };
        switch (entry.type) {
            case 'HealthCheck':
                if (typeof entry.healthCheckRating !== 'number') {
                    throw new Error('Incorrect or missing healthCheckRating');
                }
                return Object.assign(Object.assign({}, baseEntry), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(entry.healthCheckRating) });
            case 'OccupationalHealthcare':
                const occupationalEntry = Object.assign(Object.assign({}, baseEntry), { type: 'OccupationalHealthcare', employerName: parseEmployerName(entry.employerName) });
                if (entry.sickLeave) {
                    occupationalEntry.sickLeave = parseSickLeave(entry.sickLeave);
                }
                return occupationalEntry;
            case 'Hospital':
                return Object.assign(Object.assign({}, baseEntry), { type: 'Hospital', discharge: parseDischarge(entry.discharge) });
            default:
                throw new Error(`Unhandled entry type: ${entry.type}`);
            // const exhaustiveCheck: never = entry.type;
            // throw new Error(`Unhandled type: ${exhaustiveCheck}`);
        }
    }
    throw new Error('This should never happen.');
};
exports.default = toNewEntry;
