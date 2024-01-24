import { Entry, Diagnoses } from '../../types';
// import diagnoses from '../../services/diagnoses';
import CommonEntryDetails from './CommonEntryDetails';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const PatientEntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnoses[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <CommonEntryDetails entry={entry} diagnoses={diagnoses} />
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>
            {entry.date} {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  if (diagnoses) {
                    const diagnose = diagnoses.find((d) => d.code === code);
                    return (
                      <li key={code}>
                        {code} - {diagnose ? diagnose.name : 'Unknown diagnosis'}
                      </li>
                    );
                  }
                })}
              </ul>
            )}
          </p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case 'HealthCheck':
      return (
        <div>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>{entry.healthCheckRating}</p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntryDetails;
