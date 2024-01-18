import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';
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
    entries: undefined,
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensetivePatients, addPatient, getPatientById };
