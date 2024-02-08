import patients from '../../data/patients-full';
import { NonSensitivePatient, Patient, NewPatientEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { NewEntriesEntry } from '../types';

const getNonSensetivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    entries: [],
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntriesEntry, id: string): Entry | string => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  const patient = patients.find((p) => p.id === id);
  console.log('New Entry:', newEntry);

  if (patient) {
    patient.entries = patient.entries
      ? [...patient.entries, newEntry]
      : [newEntry];
    console.log('Updated entries:', patient.entries);

    return newEntry;
  } else {
    return 'Patient not found';
  }
};

export default {
  getNonSensetivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
