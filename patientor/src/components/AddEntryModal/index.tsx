import { useState } from 'react';
import { Button, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { NewEntriesEntry } from '../../types';
import OccupationalEntryForm from './OccupationalEntryForm';
// import { Margin } from '@mui/icons-material';

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
        return <HealthCheckEntryForm onCancel={onClose} onSubmit={onSubmit} onChangeEntryType={setSelectedEntryType} />;
      case 'Hospital':
        return <HospitalEntryForm onCancel={onClose} onSubmit={onSubmit} onChangeEntryType={setSelectedEntryType} />;
      case 'OccupationalHealthcare':
        return <OccupationalEntryForm onCancel={onClose} onSubmit={onSubmit} onChangeEntryType={setSelectedEntryType} />;
    }
    // Logic to render the specific entry form based on 'entryType'
    onClose(); // Close the modal
    // setSelectedEntryType(''); // modal to default
    // handleOnClose();
  };

  return (
    // <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <>
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
          <Button
            variant={getButtonVariant('OccupationalHealthcare')}
            onClick={() => handleEntrySelect('OccupationalHealthcare')}
          >
            Occupational Entry
          </Button>
          {selectedEntryType && <DialogContent>{renderEntryForm()}</DialogContent>}
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <Divider style={{marginBottom: 20}}/>
      </>
      <>
        {/* <DialogTitle>Type {selectedEntryType} Entry</DialogTitle>
        <Divider />
        <DialogContent>{renderEntryForm()}</DialogContent>
        {error && <Alert severity="error">{error}</Alert>} */}
      </>
    </>
    // </Dialog>
  );
};

export default AddEntryModal;
