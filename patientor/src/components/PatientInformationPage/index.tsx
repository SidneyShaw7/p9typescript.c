import { Alert } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { useEffect, useState } from 'react';

import { useMatch } from 'react-router-dom';

import axios from 'axios';

import patientService from '../../services/patients';

import { Patient } from '../../types';

const PatientInformationPage = () => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient | undefined>();

  const match = useMatch('/patients/:id');
  const id = match ? match.params.id : null;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const fetchedPatient = await patientService.getPatientById(id);
          if (fetchedPatient) {
            setPatient(fetchedPatient);
          }
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
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
      {patient && (
        <div>
          <h3>
            {patient.name}
            {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
          </h3>
          <div>{'Date of birth: ' + patient.dateOfBirth}</div>
          <div>{'SSN: ' + patient.ssn}</div>
          <div>{'Occupation: ' + patient.occupation}</div>
          <h4>entries</h4>
          <div>
            {patient.entries ? (
              <div>
                {patient.entries.map((entry) => (
                  <div key={entry.id}>
                    <p>
                      {entry.date} - {entry.description}
                    </p>
                    {entry.diagnosisCodes && (
                      <ul>
                        {entry.diagnosisCodes.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : Array.isArray(patient.entries) && patient.entries.length === 0 ? (
              <p>No entries</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInformationPage;
