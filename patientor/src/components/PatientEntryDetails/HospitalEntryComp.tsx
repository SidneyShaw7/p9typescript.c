import { HospitalEntry } from '../../types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const HospitalEntryComp = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <ListItem>
        <ListItemText primary={'discharge date: ' + entry.discharge.date} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={'criteria: ' + entry.discharge.criteria} />
      </ListItem>
    </div>
  );
};

export default HospitalEntryComp;
