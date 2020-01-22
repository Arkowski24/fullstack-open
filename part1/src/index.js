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
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };
  const elements = [part1, part2, part3];
  const exerciseNumber = part1.exercises + part2.exercises + part3.exercises;

  return(
    <div>
      <Header course={course}/>
      <Content elements={elements}/>
      <Total exerciseNumber={exerciseNumber}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
