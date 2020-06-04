import express from 'express';
import {calculateBmi} from "./bmiCalculator";

const app = express();
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
    } catch (error) {
        const payload = {error: error.message}
        res.json(payload).status(400);
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
