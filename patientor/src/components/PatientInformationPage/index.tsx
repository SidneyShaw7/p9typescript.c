import { Alert } from '@mui/material';

import { useEffect, useState } from 'react';

import axios from 'axios';

import patientService from '../../services/patients';

import { Patient } from '../../types';

interface Props {
  id: string;
}

const PatientInformationPage = ({ id }: Props) => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getPatientById(id);
        if (fetchedPatient) {
          setPatient(fetchedPatient);
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              ''
            );
            console.error(message);
            setError(message);
          } else {
            setError('Unrecognized axios error');
          }
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    };
    fetchPatient();
  }, [id]);

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {patient && <h4>{patient.name}</h4>}
      {patient && <span>{patient.dateOfBirth}</span>}
      {patient && <span>{patient.ssn}</span>}
      {patient && <span>{patient.occupation}</span>}
    </div>
  );
};

export default PatientInformationPage;
