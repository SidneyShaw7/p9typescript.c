import { useState, SyntheticEvent } from 'react';

import { NewEntriesEntry, Discharge } from '../../types';

import { TextField, InputLabel, Grid, Button, Box } from '@mui/material';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntriesEntry) => void;
  // onChangeEntryType: (newState: string) => void;
}

const HospitalEntryForm = ({ onCancel, onSubmit }: Props) => {
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
        label="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField label="description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} />
      <TextField label="specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
      <TextField
        label="diagnosis Codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes([target.value])}
      />
      <InputLabel style={{ marginTop: 20 }}>Discharge Entry</InputLabel>
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        type='date'
        name="date"
        label="date entry"
        fullWidth
        value={discharge.date}
        onChange={handleDichargeChange}
      />
      <TextField name="criteria" label="criteria entry" fullWidth value={discharge.criteria} onChange={handleDichargeChange} />

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
