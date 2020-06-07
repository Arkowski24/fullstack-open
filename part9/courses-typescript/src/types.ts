export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartZero extends CoursePartWithDescription {
    name: "Short review";
    previousCourse: string;
}

export interface CoursePartOne extends CoursePartWithDescription {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartZero | CoursePartOne | CoursePartTwo | CoursePartThree;
