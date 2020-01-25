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

const Course = ({course}) => (
    <div>
        <Header title={course.name}/>
        <Content course={course}/>
    </div>
);

export default Course
