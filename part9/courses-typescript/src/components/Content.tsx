import React from 'react';
import {CoursePart} from "../types";

import Part from "./Part";


interface ContentProps {
    courseParts: CoursePart[]
}

const Content: React.FC<ContentProps> = ({courseParts}) => (
    <>
        {courseParts.map((part, index) => <Part key={index} coursePart={part}/>)}
    </>
);

export default Content;
