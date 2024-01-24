import { OccupationalHealthcareEntry } from '../../types';

const OccupationalHealthcareEntryComp = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
      <p>{entry.employerName}</p>
      {entry.sickLeave && (
        <div>
          <p>start date: {entry.sickLeave.startDate}</p>
          <p>end date: {entry.sickLeave.endDate}</p>
        </div>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntryComp;
