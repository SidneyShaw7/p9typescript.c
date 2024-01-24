import { Entry, Diagnoses } from '../../types';
import CommonEntryDetails from './CommonEntryDetails';
import HospitalEntryComp from './HospitalEntryComp';
import HealthCheckEntryComp from './HealthCheckEntryComp';
import OccupationalHealthcareEntryComp from './OccupationalHealthcareEntryComp';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const PatientEntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnoses[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <List style={style}>
          <div>
            <CommonEntryDetails entry={entry} diagnoses={diagnoses} />
            <HospitalEntryComp entry={entry} />
          </div>
        </List>
      );
    case 'OccupationalHealthcare':
      return (
        <List style={style}>
          <div>
            <CommonEntryDetails entry={entry} diagnoses={diagnoses} />
            <OccupationalHealthcareEntryComp entry={entry} />
          </div>
        </List>
      );
    case 'HealthCheck':
      return (
        <List style={style}>
          <div>
            <CommonEntryDetails entry={entry} diagnoses={diagnoses} />
            <HealthCheckEntryComp entry={entry} />
          </div>
        </List>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntryDetails;
