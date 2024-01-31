// import { useState } from 'react';
// import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import { NewEntriesEntry } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntriesEntry) => void;
  error?: string;
}

const AddEntryModal = ({ onClose, modalOpen, error, onSubmit }: Props) => {
  const handleEntrySelect = (entryType: string) => {
    switch (entryType) {
      case 'hospital':
        return <HealthCheckEntryForm onCancel={onClose} onSubmit={onSubmit} />;
    }
    // Logic to render the specific entry form based on 'entryType'
    onClose(); // Close the modal
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Choose Entry Type</DialogTitle>
      <Divider />
      <DialogContent>
        <Button onClick={() => handleEntrySelect('hospital')}>Hospital Entry</Button>
        <Button onClick={() => handleEntrySelect('occupational')}>Occupational Entry</Button>
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
