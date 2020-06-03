type BmiCategory = 'Very severely underweight'
    | 'Severely underweight'
    | 'Underweight'
    | 'Normal (healthy weight)'
    | 'Overweight'
    | 'Obese Class I (Moderately obese)'
    | 'Obese Class II (Severely obese)'
    | 'Obese Class III (Very severely obese)';

const calculateBmi = (heightInCm: number, weightInKg: number): BmiCategory => {
    const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
    if (bmi < 15.0) return 'Very severely underweight';
    if (bmi < 16.0) return 'Severely underweight';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25.0) return 'Normal (healthy weight)';
    if (bmi < 30.0) return 'Overweight';
    if (bmi < 35.0) return 'Obese Class I (Moderately obese)';
    if (bmi < 40.0) return 'Obese Class II (Severely obese)'
    return 'Obese Class III (Very severely obese)';
}

console.log(calculateBmi(180, 74));
