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

// const parseString = (value: unknown, fieldName: string): string => {
//   if (!isString(value)) {
//     throw new Error(`Incorrect or missing ${fieldName}`);
//   }
//   return value;
// };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};
// HANDLE BASE-ENTRY TYPEGUARDS

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

// const parseOccupationalHealthcareEntry = (
//   objectEntry: unknown
// ): NewEntriesEntry => {
//   if (!objectEntry || typeof objectEntry !== 'object')
//     throw new Error('Incorrect or missing entry');

//   if (
//     'description' in objectEntry &&
//     'date' in objectEntry &&
//     'specialist' in objectEntry &&
//     'diagnosisCodes' in objectEntry &&
//     'type' in objectEntry &&
//     'employerName' in objectEntry
//   ) {
//     const newEntriesEntry: NewEntriesEntry = {
//       description: parseDescription(objectEntry.description),
//       date: parseDate(objectEntry.date),
//       specialist: parseSpecialist(objectEntry.specialist),
//       type: 'OccupationalHealthcare',
//       employerName: parseEmployerName(objectEntry.employerName),

//     };

//     if ('diagnosisCodes' in objectEntry)
//       parseDiagnosisCodes(objectEntry.diagnosisCodes);

//     if ('sickLeave' in objectEntry) parseSickLeave(objectEntry.sickLeave);

//     return newEntriesEntry;
//   }
//   throw new Error('Incorrect data: a field is missing.');
// };
const parseOccupationalHealthcareEntry = (
  objectEntry: unknown
): OccupationalHealthcareEntry => {
  if (!objectEntry || typeof objectEntry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }

  if (
    'description' in objectEntry &&
    'date' in objectEntry &&
    'specialist' in objectEntry &&
    'type' in objectEntry &&
    'employerName' in objectEntry
  ) {
    // Directly construct the newEntriesEntry object with all mandatory fields
    // and conditionally include optional fields using the spread operator.
    const newEntriesEntry: NewEntriesEntry = {
      description: parseDescription(objectEntry.description),
      date: parseDate(objectEntry.date),
      specialist: parseSpecialist(objectEntry.specialist),
      type: 'OccupationalHealthcare',
      employerName: parseEmployerName(objectEntry.employerName),
      // // Conditionally include diagnosisCodes if present
      // ...(objectEntry.diagnosisCodes && { diagnosisCodes: parseDiagnosisCodes(objectEntry.diagnosisCodes) }),
      // // Conditionally include sickLeave if present
      // ...(objectEntry.sickLeave && { sickLeave: parseSickLeave(objectEntry.sickLeave) }),
    };

    if ('diagnosisCodes' in objectEntry) {
      newEntriesEntry.diagnosisCodes = parseDiagnosisCodes(
        objectEntry.diagnosisCodes
      );
    }

    // Assuming parseSickLeave is a function that validates and returns a correctly typed SickLeave or undefined
    if ('sickLeave' in objectEntry && objectEntry.sickLeave) {
      newEntriesEntry.sickLeave = parseSickLeave(objectEntry.sickLeave);
    }

    return newEntriesEntry as OccupationalHealthcareEntry;
  }
  throw new Error('Incorrect data: a field is missing.');
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

const parseHospitalEntry = (objectEntry: unknown): NewEntriesEntry => {
  if (!objectEntry || typeof objectEntry !== 'object')
    throw new Error('Incorrect or missing entry');

  if (
    'description' in objectEntry &&
    'date' in objectEntry &&
    'specialist' in objectEntry &&
    'type' in objectEntry &&
    'discharge' in objectEntry
  ) {
    const newEntriesEntry: NewEntriesEntry = {
      description: parseDescription(objectEntry.description),
      date: parseDate(objectEntry.date),
      specialist: parseSpecialist(objectEntry.specialist),
      type: 'Hospital',
      discharge: parseDischarge(objectEntry.discharge),
    };

    if ('diagnosisCodes' in objectEntry)
      parseDiagnosisCodes(objectEntry.diagnosisCodes);

    return newEntriesEntry;
  }
  throw new Error('Incorrect data: a field is missing.');
};

const toNewEntry = (object: unknown): NewEntriesEntry => {
  if (typeof object !== 'object' || object === null || !('type' in object)) {
    throw new Error('Incorrect or missing entry');
  }

  const entryObject = object as { type: unknown };

  switch (entryObject.type) {
    case 'HealthCheck':
      return parseHealthCheckEntry(object);
    case 'OccupationalHealthcare':
      return parseOccupationalHealthcareEntry(object);
    case 'Hospital':
      return parseHospitalEntry(object);
    default:
      throw new Error('Incorrect or missing type');
  }
};

export default toNewEntry;
