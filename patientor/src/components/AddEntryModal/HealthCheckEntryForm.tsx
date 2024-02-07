import { useState, SyntheticEvent } from 'react';

import { NewEntriesEntry, HealthCheckRating } from '../../types';

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Box } from '@mui/material';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntriesEntry) => void;
  onChangeEntryType: (newState: string) => void;
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

const HealthCheckEntryForm = ({ onCancel, onSubmit, onChangeEntryType }: Props) => {
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
    
    onChangeEntryType('');
  };
  console.log(diagnosisCodes);
  

  return (
    <Box
      component="form"
      onSubmit={addEntry}
      sx={{
        '& > :not(style)': { m: 0.4 },
      }}
    >
      <TextField label="description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} />
      <TextField label="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />
      <TextField label="specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
      <TextField
        label="diagnosis Codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes([target.value])}
      />
      <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
      <Select
        label="healthCheck Rating"
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
