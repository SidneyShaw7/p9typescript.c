import { Entry } from "../../types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const PatientEntryDetails: React.FC <{entry: Entry}> = ({entry}) => {
    switch (entry.type) {
        case "Hospital":
            return
        case "OccupationalHealthcare":
            return
        case "HealthCheck":
            return
            default: 
            return assertNever(entry);

    }
};

export default PatientEntryDetails;