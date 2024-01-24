import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return <div>
        <p>{entry.employerName}</p>
    </div>
};

export default OccupationalHealthcareEntry;
