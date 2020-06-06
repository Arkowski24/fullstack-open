import React from 'react';
import {CoursePart} from "../types";

interface ContentProps {
    courseParts: CoursePart[]
}

const Content: React.FC<ContentProps> = ({courseParts}) => (
    <>
        {courseParts.map((course, index) =>
            <p key={index}>
                {`${course.name} ${course.exerciseCount}`}
            </p>
        )}
    </>
);

export default Content;
