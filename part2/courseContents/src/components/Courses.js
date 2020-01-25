import React from 'react'

const Header = ({title}) => <h1>{title}</h1>;

const Content = ({course}) => {
    const parts = course.parts.map((part) => <Part key={part.id} part={part}/>);

    return (
        <div>{parts}</div>
    );
};

const Part = ({part}) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Total = ({parts}) => {
    const calculateTotal = (parts) => parts.reduce((a, p) => a + p.exercises, 0);

    return (
        <b>total of {calculateTotal(parts)} exercises</b>
    )
};

const Course = ({course}) => (
    <div>
        <Header title={course.name}/>
        <Content course={course}/>
        <Total parts={course.parts}/>
    </div>
);

const Courses = ({courses}) => {
    const coursesList = courses.map((course) => <Course course={course}/>);

    return (
        <div>
            {coursesList}
        </div>
    )
};

export default Courses
