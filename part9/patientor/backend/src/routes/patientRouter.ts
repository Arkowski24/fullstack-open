import express from 'express';
import patientService from "../services/patientService";
import {toNewPatient} from '../utils/patientUtils';
import {toNewEntry} from "../utils/entryUtils";

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getAllPatients();
    res.json(patients);
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatient(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const {id} = req.params;
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addPatientEntry(id, newEntry);
        res.json(addedEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

export default router;
