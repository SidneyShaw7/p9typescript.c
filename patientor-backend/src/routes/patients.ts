import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientEntryUtils';
import toNewEntry from '../utils/entriesEntryUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensetivePatients());
});

router.get('/:id', (req, res) => {
  const patient = res.send(patientService.getPatientById(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(400);
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

router.post(':id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const userId = window.location.pathname.split('/')[2];

    const addedEntry = patientService.addEntry(newEntry, userId);

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
