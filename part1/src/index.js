import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <>
      <h1>{props.course}</h1>
    </>
);

const Content = (props) => {
  const items = [];
  for (const [part, exercises] of props.elements.entries()) {
    items.push(
      <p>
        {part} {exercises}
      </p>
    )
  }

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
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const elements = [
    [part1, exercises1],
    [part2, exercises2],
    [part3, exercises3],
  ];


  return(
    <div>
      <Header course={course}/>
      <Content elements={elements}/>
      <Total exerciseNumber={exercises1+exercises2+exercises3}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
