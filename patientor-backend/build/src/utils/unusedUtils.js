"use strict";
// const parseHealthCheckEntry = (objectEntry: unknown): NewEntriesEntry => {
//   if (!objectEntry || typeof objectEntry !== 'object')
//     throw new Error('Incorrect or missing entry');
//   if (
//     'description' in objectEntry &&
//     'date' in objectEntry &&
//     'specialist' in objectEntry &&
//     'diagnosisCodes' in objectEntry &&
//     'type' in objectEntry &&
//     'healthCheckRating' in objectEntry &&
//     typeof objectEntry.healthCheckRating === 'number'
//   ) {
//     const newEntriesEntry: NewEntriesEntry = {
//       description: parseDescription(objectEntry.description),
//       date: parseDate(objectEntry.date),
//       specialist: parseSpecialist(objectEntry.specialist),
//       type: 'HealthCheck',
//       healthCheckRating: parseHealthCheckRating(objectEntry.healthCheckRating),
//     };
//     if ('diagnosisCodes' in objectEntry)
//       parseDiagnosisCodes(objectEntry.diagnosisCodes);
//     return newEntriesEntry;
//   }
//   throw new Error('Incorrect data: a field is missing.');
// };
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
// const parseOccupationalHealthcareEntry = (
//   objectEntry: unknown
// ): OccupationalHealthcareEntry => {
//   if (!objectEntry || typeof objectEntry !== 'object') {
//     throw new Error('Incorrect or missing entry');
//   }
//   if (
//     'description' in objectEntry &&
//     'date' in objectEntry &&
//     'specialist' in objectEntry &&
//     'type' in objectEntry &&
//     'employerName' in objectEntry
//   ) {
//     // Directly construct the newEntriesEntry object with all mandatory fields
//     // and conditionally include optional fields using the spread operator.
//     const newEntriesEntry: NewEntriesEntry = {
//       description: parseDescription(objectEntry.description),
//       date: parseDate(objectEntry.date),
//       specialist: parseSpecialist(objectEntry.specialist),
//       type: 'OccupationalHealthcare',
//       employerName: parseEmployerName(objectEntry.employerName),
//       // // Conditionally include diagnosisCodes if present
//       // ...(objectEntry.diagnosisCodes && { diagnosisCodes: parseDiagnosisCodes(objectEntry.diagnosisCodes) }),
//       // // Conditionally include sickLeave if present
//       // ...(objectEntry.sickLeave && { sickLeave: parseSickLeave(objectEntry.sickLeave) }),
//     };
//     if ('diagnosisCodes' in objectEntry) {
//       newEntriesEntry.diagnosisCodes = parseDiagnosisCodes(
//         objectEntry.diagnosisCodes
//       );
//     }
//     // Assuming parseSickLeave is a function that validates and returns a correctly typed SickLeave or undefined
//     if ('sickLeave' in objectEntry && objectEntry.sickLeave) {
//       newEntriesEntry.sickLeave = parseSickLeave(objectEntry.sickLeave);
//     }
//     return newEntriesEntry as OccupationalHealthcareEntry;
//   }
//   throw new Error('Incorrect data: a field is missing.');
// };
// const parseHospitalEntry = (objectEntry: unknown): NewEntriesEntry => {
//   if (!objectEntry || typeof objectEntry !== 'object')
//     throw new Error('Incorrect or missing entry');
//   if (
//     'description' in objectEntry &&
//     'date' in objectEntry &&
//     'specialist' in objectEntry &&
//     'type' in objectEntry &&
//     'discharge' in objectEntry
//   ) {
//     const newEntriesEntry: NewEntriesEntry = {
//       description: parseDescription(objectEntry.description),
//       date: parseDate(objectEntry.date),
//       specialist: parseSpecialist(objectEntry.specialist),
//       type: 'Hospital',
//       discharge: parseDischarge(objectEntry.discharge),
//     };
//     if ('diagnosisCodes' in objectEntry)
//       parseDiagnosisCodes(objectEntry.diagnosisCodes);
//     return newEntriesEntry;
//   }
//   throw new Error('Incorrect data: a field is missing.');
// };
// const toNewEntry = (object: unknown): NewEntriesEntry => {
//   if (typeof object !== 'object' || object === null || !('type' in object)) {
//     throw new Error('Incorrect or missing entry');
//   }
//   const entryObject = object as { type: unknown };
//   switch (entryObject.type) {
//     case 'HealthCheck':
//       return parseHealthCheckEntry(object);
//     case 'OccupationalHealthcare':
//       return parseOccupationalHealthcareEntry(object);
//     case 'Hospital':
//       return parseHospitalEntry(object);
//     default:
//       throw new Error('Incorrect or missing type');
//   }
// };
// const parseString = (value: unknown, fieldName: string): string => {
//       if (!isString(value)) {
//         throw new Error(`Incorrect or missing ${fieldName}`);
//       }
//       return value;
//     };
