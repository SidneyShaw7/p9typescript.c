import { Entry } from '../../types';
import { Diagnosis } from '../../types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { List, Typography } from '@mui/material';

const style = {
  paddingTop: 0,
  paddingBottom: 0,
};

const typeStyle = {
  fontStyle: 'italic',
};

const CommonEntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) => {
  return (
    <>
      <ListItem style={style}>
        <ListItemText primary={entry.date} />
      </ListItem>
      <ListItem style={style}>
        <Typography style={typeStyle}>
          <ListItemText primary={entry.description} />
        </Typography>
      </ListItem>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <>
          <List style={style}>
            {entry.diagnosisCodes.map((code) => (
              <ListItem style={style} key={code}>
                <ListItemText primary={`${code} - ${diagnoses.find((d) => d.code === code)?.name || 'Unknown diagnosis'}`} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <ListItem style={style}>
        <ListItemText primary={'diagnosed by: ' + entry.specialist} />
      </ListItem>
    </>
  );
};

export default CommonEntryDetails;
