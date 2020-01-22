import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <>
      <h1>{props.course}</h1>
    </>
);

const Part = (props) => (
  <>
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  </>
);

const Content = (props) => {
  const items = props.elements.map(part => <Part part={part}/>);

  return(
    <>
      {items}
    </>
  )
};

const Total = (props) => (
  <p>Number of exercises {props.exerciseNumber}</p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const exerciseNumber =
    course.parts.map(p => p.exercises)
         .reduce((a, c) => a + c, 0);

  return(
    <div>
      <Header course={course.name}/>
      <Content elements={course.parts}/>
      <Total exerciseNumber={exerciseNumber}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
