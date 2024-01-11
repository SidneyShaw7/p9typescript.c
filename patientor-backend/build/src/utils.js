"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation.');
    }
    return occupation;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!isString(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth.');
    }
    return dateOfBirth;
};
const parseSSN = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing SSN.');
    }
    return ssn;
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name.');
    }
    return name;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('occupation' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'name' in object) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: a field is missing.');
};
exports.default = toNewPatientEntry;
