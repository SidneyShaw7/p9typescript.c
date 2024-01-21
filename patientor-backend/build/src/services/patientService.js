"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_full_1 = __importDefault(require("../../data/patients-full"));
const uuid_1 = require("uuid");
const getNonSensetivePatients = () => {
    return patients_full_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientById = (id) => {
    const patient = patients_full_1.default.find((p) => p.id === id);
    return patient;
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ entries: [], id: (0, uuid_1.v4)() }, entry);
    patients_full_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getNonSensetivePatients, addPatient, getPatientById };
