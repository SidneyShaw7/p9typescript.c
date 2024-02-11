import { useState, SyntheticEvent } from 'react';

import { NewEntriesEntry, HealthCheckRating, Diagnosis } from '../../types';

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
  error?: string;
  diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
  value: string;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.keys(HealthCheckRating)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    value: key,
    label: key,
  }));

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

const HealthCheckEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const onHealthCheckRatingChange = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    const value = e.target.value;
    const healthCheckRating = Object.keys(HealthCheckRating).find((k) => k === value);
    if (healthCheckRating) {
      setHealthCheckRating(HealthCheckRating[healthCheckRating as keyof typeof HealthCheckRating]);
    }
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
      type: 'HealthCheck' as const,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
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
        <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
        <Select
          fullWidth
          value={HealthCheckRating[healthCheckRating]}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
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

export default HealthCheckEntryForm;
