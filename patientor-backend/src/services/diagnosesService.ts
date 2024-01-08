import diagnoses from '../../data/diagnoses';
import patients from '../../data/patients';

import { Diagnose, PatientWithNoSSN } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const getNonSensetivePatients = (): PatientWithNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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

export default {
  getDiagnoses,
  addDiagnose,
  getNonSensetivePatients,
};
