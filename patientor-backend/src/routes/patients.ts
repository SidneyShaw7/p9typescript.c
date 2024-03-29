import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientEntryUtils';
import toNewEntry from '../utils/entriesEntryUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensetivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/patients/:id/entries', (req, res) => {
  const patientId = req.params.id;
  const patient = patientService.getPatientById(patientId);

  if (patient) {
    res.json(patient.entries);
  } else {
    res.status(404).send('Patient not found');
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const userId = req.params.id;
    // console.log("New entry: ", newEntry);
    const addedEntry = patientService.addEntry(newEntry, userId);
    // console.log('Request body:', req.body);
    // console.log(addedEntry);
    // res.json(req.body);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
