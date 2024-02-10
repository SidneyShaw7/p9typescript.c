import { useState } from 'react';
import { Button, DialogTitle, DialogContent, Divider } from '@mui/material';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { NewEntriesEntry } from '../../types';
import OccupationalEntryForm from './OccupationalEntryForm';

interface Props {
  // modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntriesEntry) => void;
  error?: string;
}

const AddEntryModal = ({ onClose, onSubmit }: Props) => {
  const [selectedEntryType, setSelectedEntryType] = useState('');

  const handleEntrySelect = (entryType: string) => {
    setSelectedEntryType(entryType);
  };

  // const handleOnClose = () => {
  //   onClose();
  //   setTimeout(() => {
  //     setSelectedEntryType('');
  //   }, 250);
  // };

  const getButtonVariant = (buttonType: string) => {
    return selectedEntryType === buttonType ? 'contained' : 'outlined';
  };

  const renderEntryForm = () => {
    switch (selectedEntryType) {
      case 'HealthCheck':
        return <HealthCheckEntryForm onCancel={onClose} onSubmit={onSubmit} />;
      case 'Hospital':
        return <HospitalEntryForm onCancel={onClose} onSubmit={onSubmit} />;
      case 'OccupationalHealthcare':
        return <OccupationalEntryForm onCancel={onClose} onSubmit={onSubmit} />;
    }
    onClose(); // Close the modal
  };

  return (
    <>
      {!selectedEntryType && <DialogTitle>Choose Entry Type</DialogTitle>}
      <Divider />
      <DialogContent>
        <Button variant={getButtonVariant('Hospital')} onClick={() => handleEntrySelect('Hospital')}>
          Hospital Entry
        </Button>
        <Button variant={getButtonVariant('HealthCheck')} onClick={() => handleEntrySelect('HealthCheck')}>
          HealthCare Check
        </Button>
        <Button variant={getButtonVariant('OccupationalHealthcare')} onClick={() => handleEntrySelect('OccupationalHealthcare')}>
          Occupational Entry
        </Button>
        {selectedEntryType && <DialogContent>{renderEntryForm()}</DialogContent>}
      </DialogContent>
      <Divider style={{ marginBottom: 20 }} />
    </>
  );
};

export default AddEntryModal;
