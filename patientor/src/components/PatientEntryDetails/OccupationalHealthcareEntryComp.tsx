import { OccupationalHealthcareEntry } from '../../types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  alignItems: 'left',
};

const OccupationalHealthcareEntryComp = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
      <ListItem style={style}>
        <ListItemText primary={'employer: ' + entry.employerName} />
      </ListItem>
      {entry.sickLeave?.startDate && (
        <>
          <Divider />
          <ListItem>
            <ListItemText primary={'start date: ' + entry.sickLeave.startDate} />
          </ListItem>
        </>
      )}
      {entry.sickLeave?.endDate && (
        <ListItem>
          <ListItemText primary={'end date: ' + entry.sickLeave.endDate} />
        </ListItem>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntryComp;
