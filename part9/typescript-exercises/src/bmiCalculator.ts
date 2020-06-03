interface BmiInput {
    heightInCm: number,
    weightInKg: number
}

const parseBmiArguments = (args: Array<string>): BmiInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightInCm: Number(args[2]),
            weightInKg: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

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

try {
    const {heightInCm, weightInKg} = parseBmiArguments(process.argv);
    const result = calculateBmi(heightInCm, weightInKg);
    console.log(result);
} catch (e) {
    console.log('Error: ', e.message);
}

