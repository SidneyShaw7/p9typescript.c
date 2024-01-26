import { Entry, Diagnoses } from '../../types';
import CommonEntryDetails from './CommonEntryDetails';
import HospitalEntryComp from './HospitalEntryComp';
import HealthCheckEntryComp from './HealthCheckEntryComp';
import OccupationalHealthcareEntryComp from './OccupationalHealthcareEntryComp';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 800,
  borderRadius: 10,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  margin: 5,
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const PatientEntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnoses[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <List style={style}>
          <CommonEntryDetails entry={entry} diagnoses={diagnoses} />
          <Divider />
          <HospitalEntryComp entry={entry} />
        </List>
      );
    case 'OccupationalHealthcare':
      return (
        <List style={style}>
          <CommonEntryDetails entry={entry} diagnoses={diagnoses} />
          <Divider />
          <OccupationalHealthcareEntryComp entry={entry} />
        </List>
      );
    case 'HealthCheck':
      return (
        <List style={style}>
          <CommonEntryDetails entry={entry} diagnoses={diagnoses} />
          <HealthCheckEntryComp entry={entry} />
        </List>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntryDetails;
