import patients from '../../data/patients';
import { PatientWithNoSSN } from '../types';

const getNonSensetivePatients = (): PatientWithNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getNonSensetivePatients };
