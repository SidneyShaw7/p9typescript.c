import {
  NewEntriesEntry,
  Diagnosis,
  Discharge,
  SickLeave,
  HealthCheckEntry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return value;
};

// HANDLE BASE-ENTRY TYPEGUARDS

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description.');
  }

  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
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

const parseHealthCheckEntry = (objectEntry: unknown): NewEntriesEntry => {
  if (!objectEntry || typeof objectEntry !== 'object')
    throw new Error('Incorrect or missing entry');

  if (
    'description' in objectEntry &&
    'date' in objectEntry &&
    'specialist' in objectEntry &&
    'diagnosisCodes' in objectEntry &&
    'type' in objectEntry &&
    'healthCheckRating' in objectEntry &&
    typeof objectEntry.healthCheckRating === 'number'
  ) {
    const newEntriesEntry: NewEntriesEntry = {
      description: parseDescription(objectEntry.description),
      date: parseDate(objectEntry.date),
      specialist: parseSpecialist(objectEntry.specialist),
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(objectEntry.healthCheckRating),
    };

    if ('diagnosisCodes' in objectEntry)
      parseDiagnosisCodes(objectEntry.diagnosisCodes);

    return newEntriesEntry;
  }
  throw new Error('Incorrect data: a field is missing.');
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

const parceOccupationalHealthcareEntry = (
  objectEntry: unknown
): NewEntriesEntry => {
  if (!objectEntry || typeof objectEntry !== 'object')
    throw new Error('Incorrect or missing entry');

  if (
    'description' in objectEntry &&
    'date' in objectEntry &&
    'specialist' in objectEntry &&
    'diagnosisCodes' in objectEntry &&
    'type' in objectEntry &&
    'employerName' in objectEntry
  ) {
    const newEntriesEntry: NewEntriesEntry = {
      description: parseDescription(objectEntry.description),
      date: parseDate(objectEntry.date),
      specialist: parseSpecialist(objectEntry.specialist),
      type: 'OccupationalHealthcare',
      employerName: parseEmployerName(objectEntry.employerName),
    };

    if ('diagnosisCodes' in objectEntry)
      parseDiagnosisCodes(objectEntry.diagnosisCodes);

    if ('sickLeave' in objectEntry) parseSickLeave(objectEntry.sickLeave);

    return newEntriesEntry;
  }
  throw new Error('Incorrect data: a field is missing.');
};
