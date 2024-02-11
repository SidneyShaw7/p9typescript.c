import { useState, SyntheticEvent } from 'react';

import { NewEntriesEntry, Discharge, Diagnosis } from '../../types';

import {
  TextField,
  InputLabel,
  Grid,
  Button,
  Box,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
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

const HospitalEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [discharge, setDischarge] = useState<Discharge>({ date: '', criteria: '' });

  const handleDichargeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDischarge((prevState) => ({
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
      type: 'Hospital' as const,
      date,
      specialist,
      diagnosisCodes,
      discharge,
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
      <InputLabel style={{ marginTop: 20 }}>Discharge Entry</InputLabel>
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        type="date"
        name="date"
        label="Date"
        fullWidth
        value={discharge.date}
        onChange={handleDichargeChange}
      />
      <TextField name="criteria" label="Criteria" fullWidth value={discharge.criteria} onChange={handleDichargeChange} />
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

export default HospitalEntryForm;
