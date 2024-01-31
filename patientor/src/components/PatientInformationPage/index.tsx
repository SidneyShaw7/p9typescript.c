import { Alert, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { useEffect, useState } from 'react';

import { useMatch } from 'react-router-dom';

import axios from 'axios';

import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';

import { Patient } from '../../types';
import { Diagnoses } from '../../types';

import PatientEntryDetails from '../PatientEntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientInformationPage = () => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const fetchedDiagnoses = await diagnosesService.getAll();
        if (fetchedDiagnoses) {
          setDiagnoses(fetchedDiagnoses);
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
    fetchDiagnoses();
  }, []);

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
          <h2>Entries</h2>
          <div>
            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>
            <AddEntryModal modalOpen={modalOpen} onClose={closeModal} />
          </div>
          <div>
            {patient.entries.length > 0 && diagnoses ? (
              patient.entries.map((entry) => {
                return <PatientEntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />;
              })
            ) : (
              <p>No entries</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInformationPage;
