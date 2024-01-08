import express from 'express';
import patientService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensetivePatients());
});

export default router;
