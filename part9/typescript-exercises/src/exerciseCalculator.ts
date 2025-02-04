export interface ExercisesInput {
    dailyExerciseHours: Array<number>,
    targetDailyHours: number
}

const parseExerciseArguments = (args: Array<string>): ExercisesInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    args = args.slice(2);
    const numbers = args.map(a => Number(a));
    const nans = numbers.filter(n => !isFinite(n));
    if (nans.length > 0) throw new Error('Provided non-finite number');
    return {
        dailyExerciseHours: numbers.slice(1),
        targetDailyHours: numbers[0]
    };
};

export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (dailyExerciseHours: Array<number>, targetDailyHours: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(h => h > 0).length;
    const successDays = dailyExerciseHours.filter(h => h >= targetDailyHours).length;
    const success = successDays === periodLength;
    const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
    const rating = success ? 3 : (average / targetDailyHours >= 0.5 ? 2 : 1);
    const ratingDescription = rating === 3 ? 'congratulations'
        : (rating === 2 ? 'not too bad but could be better' : 'you have to try a bit harder');
    const target = targetDailyHours;
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

if (typeof require !== 'undefined' && require.main === module) {
    try {
        const {dailyExerciseHours, targetDailyHours} = parseExerciseArguments(process.argv);
        const result = calculateExercises(dailyExerciseHours, targetDailyHours);
        console.log(result);
    } catch (e) {
        if (e instanceof Error) {
            console.log('Error: ', e.message);
        } else {
            throw e;
        }
    }
}
