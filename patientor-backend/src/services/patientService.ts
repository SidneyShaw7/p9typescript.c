import patients from '../../data/patients';
import { PatientWithNoSSN, Patient, NewPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';


const getNonSensetivePatients = (): PatientWithNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
const newPatient = {
    id: uuidv4(),
    ...entry,
};

patients.push(newPatient);
return newPatient;
};

export default { getNonSensetivePatients, addPatient };
