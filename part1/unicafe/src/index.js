import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const SectionHeader = (props) => (
    <>
        <h2>{props.message}</h2>
    </>
);

const FeedbackValue = (props) => (
    <>
        <p>{props.buttonName} {props.buttonValue}</p>
    </>
);

const FeedbackButton = (props) => {
    const incrementButton = () => props.setFun(props.buttonValue + 1);
    return(
        <>
            <button onClick={incrementButton}> {props.buttonName}</button>
        </>
    )
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <div>
                <SectionHeader message={"give feedback"}/>
                <FeedbackButton buttonName={"Good"} buttonValue={good} setFun={setGood}/>
                <FeedbackButton buttonName={"Neutral"} buttonValue={neutral} setFun={setNeutral}/>
                <FeedbackButton buttonName={"Bad"} buttonValue={bad} setFun={setBad}/>
            </div>
            <div>
                <SectionHeader message={"statistics"}/>
                <FeedbackValue buttonName={"Good"} buttonValue={good}/>
                <FeedbackValue buttonName={"Neutral"} buttonValue={neutral}/>
                <FeedbackValue buttonName={"Bad"} buttonValue={bad}/>
            </div>
        </>
    )
};

ReactDOM.render(<App />,
    document.getElementById('root')
);
