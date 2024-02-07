import { Entry } from '../../types';
import { Diagnoses } from '../../types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { List } from '@mui/material';

const CommonEntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnoses[] }) => {
  return (
    <div>
      <ListItem sx={{ textAlign: 'left' }}>
        <ListItemText secondary="entry date: " />
        <ListItemText style={{ textAlign: 'left' }} primary={entry.date} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText secondary="discription: " />
        <ListItemText primary={entry.description} />
      </ListItem>
      <Divider component="li" />
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <>
          <Divider component="li" />
          <List>
            {entry.diagnosisCodes.map((code) => (
              <ListItem key={code}>
                <ListItemText primary={`${code} - ${diagnoses.find((d) => d.code === code)?.name || 'Unknown diagnosis'}`} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={'diagnose by: ' + entry.specialist} />
      </ListItem>
    </div>
  );
};

export default CommonEntryDetails;
