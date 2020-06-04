import express from 'express';
import {calculateBmi} from "./bmiCalculator";
import {ExercisesInput, calculateExercises} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    try {
        const {height, weight} = req.query;
        const heightInCm = Number(height);
        const weightInKg = Number(weight);

        if (!isFinite(heightInCm) || !isFinite(weightInKg))
            throw new Error("malformed parameters");
        const bmi = calculateBmi(heightInCm, weightInKg);

        const payload = {height, weight, bmi};
        res.json(payload);
    } catch (e) {
        if (e instanceof Error) {
            const payload = {error: e.message};
            res.json(payload).status(400);
        } else {
            throw e;
        }
    }
});
app.post('/exercises', (req, res) => {
    interface BodyInput {
        dailyExercises: Array<number>
        target: number
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateInput = (dailyExercises: any, target: any): ExercisesInput => {
        if (dailyExercises === undefined || target === undefined)
            throw new Error("parameters missing");
        const targetDailyHours = Number(target);
        if (!(dailyExercises instanceof Array) || !(isFinite(target)))
            throw new Error("malformed parameters");
        const dailyExerciseHours = dailyExercises.map(e => Number(e));
        if (dailyExerciseHours.filter(d => !isFinite(d)).length > 0)
            throw new Error("malformed parameters");
        return {
            dailyExerciseHours,
            targetDailyHours
        };
    };

    try {
        const {dailyExercises, target} = req.body as BodyInput;
        const {dailyExerciseHours, targetDailyHours} = validateInput(dailyExercises, target);
        const payload = calculateExercises(dailyExerciseHours, targetDailyHours);
        res.json(payload);
    } catch (e) {
        if (e instanceof Error) {
            const payload = {error: e.message};
            res.json(payload).status(400);
        } else {
            throw e;
        }
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
