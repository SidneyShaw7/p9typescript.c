import {
  NewEntriesEntry,
  Diagnosis,
  Discharge,
  SickLeave,
  HealthCheckRating,
  OccupationalHealthcareEntry,
} from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// HANDLE BASE-ENTRY TYPEGUARDS

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description.');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist))
    throw new Error('Incorrect or missing specialist.');

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

// HANDLE HEALTH-CHECK-ENTRY TYPEGUARDS

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  rating: number | HealthCheckRating
): HealthCheckRating => {
  if (!isHealthCheckRating(rating))
    throw new Error('Invalid Health Check Rating');

  return rating;
};


// HANDLE OCCUPATIONAL-HEALTHCARE-ENTRY TYPEGUARDS

interface PreValidationSickLeave {
  startDate?: string;
  endDate?: string;
}

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName))
    throw new Error('Incorrect or missing Employer Name');

  return employerName;
};

const isSickLeave = (
  sickLeave: PreValidationSickLeave
): sickLeave is SickLeave => {
  return (
    sickLeave && isString(sickLeave.startDate) && isString(sickLeave.endDate)
  );
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    typeof sickLeave === 'object' &&
    sickLeave !== null &&
    isSickLeave(sickLeave as PreValidationSickLeave)
  ) {
    return sickLeave as SickLeave;
  }
  throw new Error('Invalid Sick Leave entry');
};


// HOSPITAL-ENTRY TRYPEGUARDS

interface PreValidationDischarge {
  date?: unknown;
  criteria?: unknown;
}

const isDischarge = (
  discharge: PreValidationDischarge
): discharge is Discharge => {
  return discharge && isString(discharge.criteria) && isString(discharge.date);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    typeof discharge === 'object' &&
    discharge !== null &&
    isDischarge(discharge as PreValidationDischarge)
  ) {
    return discharge as Discharge;
  }
  throw new Error('Invalid Discharge entry');
};

// NEW ENTRY FINAL CHECK

interface EntryInput {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
  employerName?: string;
  healthCheckRating?: HealthCheckRating;
  discharge?: Discharge;
  sickLeave?: SickLeave;
}

const toNewEntry = (objectEntry: unknown): NewEntriesEntry => {
  if (
    typeof objectEntry !== 'object' ||
    objectEntry === null ||
    !('type' in objectEntry)
  ) {
    throw new Error('Incorrect or missing entry type');
  }

  const entry = objectEntry as EntryInput;

  if (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'type' in entry
  ) {
    const baseEntry = {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      diagnosisCodes: entry.diagnosisCodes
        ? parseDiagnosisCodes(entry.diagnosisCodes)
        : undefined,
    };

    switch (entry.type) {
      case 'HealthCheck':
        if (typeof entry.healthCheckRating !== 'number') {
          throw new Error('Incorrect or missing healthCheckRating');
        }
        return {
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        };
      case 'OccupationalHealthcare':
        const occupationalEntry: Partial<OccupationalHealthcareEntry> = {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseEmployerName(entry.employerName),
        };
        if (entry.sickLeave) {
          occupationalEntry.sickLeave = parseSickLeave(entry.sickLeave);
        }
        return occupationalEntry as OccupationalHealthcareEntry;
      case 'Hospital':
        return {
          ...baseEntry,
          type: 'Hospital',
          discharge: parseDischarge(entry.discharge),
        };
      default:
        throw new Error(`Unhandled entry type: ${entry.type}`);
      // const exhaustiveCheck: never = entry.type;
      // throw new Error(`Unhandled type: ${exhaustiveCheck}`);
    }
  }
  throw new Error('This should never happen.');
};

export default toNewEntry;
