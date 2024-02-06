import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { NewEntriesEntry } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntriesEntry) => void;
  error?: string;
}

const AddEntryModal = ({ onClose, modalOpen, error, onSubmit }: Props) => {
  const [selectedEntryType, setSelectedEntryType] = useState('');

  const handleEntrySelect = (entryType: string) => {
    setSelectedEntryType(entryType);
  };

  const handleOnClose = () => {
    onClose();
    setTimeout(() => {
      setSelectedEntryType('');
    }, 250);
  };

  const renderEntryForm = () => {
    switch (selectedEntryType) {
      case 'HealthCheck':
        return <HealthCheckEntryForm onCancel={handleOnClose} onSubmit={onSubmit} onChangeEntryType={setSelectedEntryType} />;
      case 'Hospital':
        return <HospitalEntryForm onCancel={handleOnClose} onSubmit={onSubmit} onChangeEntryType={setSelectedEntryType}/>;
    }
    // Logic to render the specific entry form based on 'entryType'
    onClose(); // Close the modal
    // setSelectedEntryType(''); // modal to default
    // handleOnClose();
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      {!selectedEntryType ? (
        <>
          <DialogTitle>Choose Entry Type</DialogTitle>
          <Divider />
          <DialogContent>
            <Button onClick={() => handleEntrySelect('Hospital')}>Hospital Entry</Button>
            <Button onClick={() => handleEntrySelect('HealthCheck')}>HealthCare Check</Button>
            <Button onClick={() => handleEntrySelect('occupational')}>Occupational Entry</Button>
            {error && <Alert severity="error">{error}</Alert>}
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>Type {selectedEntryType} Entry</DialogTitle>
          <Divider />
          <DialogContent>{renderEntryForm()}</DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
        </>
      )}
    </Dialog>
  );
};

export default AddEntryModal;
