import { Entry } from '../../types';
import { Diagnoses } from '../../types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const CommonEntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnoses[] }) => {
  return (
    <div>
      <ListItem>
        <ListItemText primary={entry.date} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={entry.description} />
      </ListItem>
      <Divider component="li" />
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            if (diagnoses) {
              const diagnose = diagnoses.find((d) => d.code === code);
              return (
                <li key={code}>
                  <ListItem>
                    <ListItemText primary={code + ' - ' + (diagnose ? diagnose.name : 'Unknown diagnosis')} />
                  </ListItem>
                </li>
              );
            }
          })}
        </ul>
      )}
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={'diagnose by: ' + entry.specialist} />
      </ListItem>
    </div>
  );
};

export default CommonEntryDetails;
