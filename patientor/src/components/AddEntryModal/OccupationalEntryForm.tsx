import { useState, SyntheticEvent } from 'react';

import { NewEntriesEntry, SickLeave } from '../../types';

import { TextField, InputLabel, Grid, Button, Box } from '@mui/material';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntriesEntry) => void;
  // onChangeEntryType: (newState: string) => void;
}

const OccupationalEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState<string>('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({ startDate: '', endDate: '' });

  const handleSickLeaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSickLeave((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();

    const diagnosisCodes = diagnosisCodesInput.split(',').map((code) => code.trim());

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
        value={diagnosisCodesInput}
        onChange={({ target }) => setDiagnosisCodesInput(target.value)}
      />
      <TextField label="employer name" fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
      <InputLabel style={{ marginTop: 20 }}>Sick Leave Entry</InputLabel>
      <TextField
        name="startDate"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        label="start date entry"
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
        label="end date entry"
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
