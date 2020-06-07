import React from 'react';
import {CoursePart} from "../types";

interface PartProps {
    coursePart: CoursePart
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<PartProps> = ({coursePart}) => {
    switch (coursePart.name) {
        case "Short review":
            return <p>{`${coursePart.name}, ${coursePart.exerciseCount}, ${coursePart.description}, ${coursePart.previousCourse}`}</p>;
        case "Fundamentals":
            return <p>{`${coursePart.name}, ${coursePart.exerciseCount}, ${coursePart.description}`}</p>;
        case "Using props to pass data":
            return <p>{`${coursePart.name}, ${coursePart.exerciseCount}, ${coursePart.groupProjectCount}`}</p>;
        case "Deeper type usage":
            return <p>{`${coursePart.name}, ${coursePart.exerciseCount}, ${coursePart.description}, ${coursePart.exerciseSubmissionLink}`}</p>;
        default:
            return assertNever(coursePart);
    }
};

export default Part;
