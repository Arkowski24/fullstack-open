interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyExerciseHours: number[], targetDailyHours: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(h => h > 0).length;
    const successDays = dailyExerciseHours.filter(h => h >= targetDailyHours).length;
    const success = successDays === periodLength;
    const rating = success ? 3 : (successDays / periodLength > 0.5 ? 2 : 1);
    const ratingDescription = rating === 3 ? 'congratulations'
        : (rating === 2 ? 'not too bad but could be better' : 'you have to try a bit harder');
    const target = targetDailyHours;
    const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
