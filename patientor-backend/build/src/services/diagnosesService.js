"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const patients_1 = __importDefault(require("../../data/patients"));
const getDiagnoses = () => {
    return diagnoses_1.default;
};
const getNonSensetivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addDiagnose = () => {
    return null;
};
exports.default = {
    getDiagnoses,
    addDiagnose,
    getNonSensetivePatients,
};
