import { Alert, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { useEffect, useState } from 'react';

import { useMatch } from 'react-router-dom';

import axios from 'axios';

import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';

import { NewEntriesEntry, Patient } from '../../types';
import { Diagnosis } from '../../types';

import PatientEntryDetails from '../PatientEntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientInformationPage = () => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  // SHOW FORM
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const match = useMatch('/patients/:id');
  const id = match ? match.params.id : null;

  // TIMEOUT ERROR

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(undefined);
    }, 2500);

    return () => clearTimeout(timer);
  }, [error]);

  // FETCHING PATIENT INFO

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

  // FETCHING DIAGNOSIS

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

  // SUBMITING NEW INFO ABOUT PATIENT

  const submitNewEntry = async (values: NewEntriesEntry) => {
    try {
      if (id) {
        const entry = await patientService.createEntry(values, id);

        if (patient) {
          const updatedEntries = [...patient.entries, entry];
          const updatedPatient = { ...patient, entries: updatedEntries };
          setPatient(updatedPatient);
          toggleForm();
          // setModalOpen(false);
        }
      }
    } catch (e: unknown) {
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

  return (
    <div>
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
          {error && <Alert severity="error">{error}</Alert>}
          <div>
            {!showForm ? (
              <Button variant="contained" onClick={toggleForm}>
                Add New Entry
              </Button>
            ) : (
              diagnoses && <AddEntryModal onSubmit={submitNewEntry} onClose={toggleForm} error={error} diagnoses={diagnoses} />
            )}
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
