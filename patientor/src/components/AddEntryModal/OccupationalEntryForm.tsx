import { useState, SyntheticEvent } from 'react';

import { NewEntriesEntry, SickLeave, Diagnosis } from '../../types';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntriesEntry) => void;
  diagnoses: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const OccupationalEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({ startDate: '', endDate: '' });

  const handleSickLeaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSickLeave((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();

    onSubmit({
      description,
      type: 'OccupationalHealthcare' as const,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={addEntry}
      sx={{
        '& > :not(style)': { m: 0.4 },
      }}
    >
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        type="date"
        label="Date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField label="Description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} />
      <TextField label="Specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Diagnoses Codes</InputLabel>
        <Select
          label="Diagnoses Codes"
          fullWidth
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={diagnosisCodes}
          onChange={handleCodeChange}
          input={<OutlinedInput label="Diagnoses Codes" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnose) => (
            <MenuItem key={diagnose.code} value={diagnose.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
              <ListItemText primary={diagnose.code + ' - ' + diagnose.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="Employer Name" fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
      <InputLabel style={{ marginTop: 20 }}>Sick Leave Entry</InputLabel>
      <TextField
        name="startDate"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        label="Start Date"
        fullWidth
        value={sickLeave.startDate}
        onChange={handleSickLeaveChange}
      />
      <TextField
        type="date"
        name="endDate"
        InputLabelProps={{
          shrink: true,
        }}
        label="End Date"
        fullWidth
        value={sickLeave.endDate}
        onChange={handleSickLeaveChange}
      />

      <Grid>
        <Grid item>
          <Button color="secondary" variant="contained" style={{ float: 'left' }} type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: 'right',
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OccupationalEntryForm;
