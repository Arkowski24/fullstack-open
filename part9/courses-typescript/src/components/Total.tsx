import React from "react";
import {CoursePart} from "../types";

interface TotalProps {
    courseParts: CoursePart[]
}

const Total: React.FC<TotalProps> = ({courseParts}) => {
    const exerciseNumber = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
    return (
        <p>
            {`Number of exercises ${exerciseNumber}`}
        </p>
    );
};

export default Total;
