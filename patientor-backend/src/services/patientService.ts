import patients from '../../data/patients-full';
import { NonSensitivePatient, Patient, NewPatientEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

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

const addEntry = (entry: Entry, id: ): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  };

  const patient = patients.find((p) => p.id = id)
  patient?.entries.push(newEntry);
  return patient;
};

export default { getNonSensetivePatients, addPatient, getPatientById, addEntry };
