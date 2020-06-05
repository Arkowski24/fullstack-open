import diagnoseData from '../data/diagnoses.json';
import {Diagnose} from "../types";

const diagnoses: Diagnose[] = diagnoseData as Diagnose[];

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};
