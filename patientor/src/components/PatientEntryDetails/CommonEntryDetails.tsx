import { Entry } from '../../types';
import { Diagnoses } from '../../types';

const CommonEntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnoses[] }) => {
  return (
    <div>
      <p>{entry.date}</p>
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
};

export default CommonEntryDetails;
