import { OccupationalHealthcareEntry } from '../../types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const style = {
  paddingTop: 0,
  paddingBottom: 0
};

const OccupationalHealthcareEntryComp = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <>
      <ListItem style={style}>
        <ListItemText primary={'employer: ' + entry.employerName} />
      </ListItem>
      {entry.sickLeave?.startDate && (
        <>
          <ListItem style={style}>
            <ListItemText primary={'start date: ' + entry.sickLeave.startDate} />
          </ListItem>
        </>
      )}
      {entry.sickLeave?.endDate && (
        <ListItem style={style}>
          <ListItemText primary={'end date: ' + entry.sickLeave.endDate} />
        </ListItem>
      )}
    </>
  );
};

export default OccupationalHealthcareEntryComp;
