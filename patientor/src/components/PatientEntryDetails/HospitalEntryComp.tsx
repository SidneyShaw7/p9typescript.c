import { HospitalEntry } from '../../types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const style = {
  paddingTop: 0,
  paddingBottom: 0
};

const HospitalEntryComp = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <ListItem style={style}>
        <ListItemText primary={'discharge date: ' + entry.discharge.date} />
      </ListItem>
      <ListItem style={style}>
        <ListItemText primary={'criteria: ' + entry.discharge.criteria} />
      </ListItem>
    </>
  );
};

export default HospitalEntryComp;
