"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const patientEntryUtils_1 = __importDefault(require("../utils/patientEntryUtils"));
const entriesEntryUtils_1 = __importDefault(require("../utils/entriesEntryUtils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensetivePatients());
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, patientEntryUtils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get('/patients/:id/entries', (req, res) => {
    const patientId = req.params.id;
    const patient = patientService_1.default.getPatientById(patientId);
    if (patient) {
        res.json(patient.entries);
    }
    else {
        res.status(404).send('Patient not found');
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = (0, entriesEntryUtils_1.default)(req.body);
        const userId = req.params.id;
        const addedEntry = patientService_1.default.addEntry(newEntry, userId);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
