import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const SectionHeader = (props) => (
    <>
        <h2>{props.message}</h2>
    </>
);

const FeedbackValue = (props) => (
    <>
        {props.buttonName} {props.buttonValue}<br/>
    </>
);

const FeedbackButton = (props) => {
    const incrementButton = () => props.setFun(props.buttonValue + 1);
    return (
        <>
            <button onClick={incrementButton}> {props.buttonName}</button>
        </>
    )
};

const EvaluationField = (props) => {
    const fieldValue = props.evalFun(props.currentState);
    return (
        <>
            {props.fieldName} {fieldValue}<br/>
        </>
    )
};

const Statistics = (props) => {
    const evalTotal = (cs) => cs.good + cs.neutral + cs.bad;
    const evalAverage = (cs) => (cs.good - cs.bad) / evalTotal(cs);
    const evalPositive = (cs) => cs.good / evalTotal(cs) * 100 + " %";

    return (
        <div>
            <SectionHeader message={"statistics"}/>
            <FeedbackValue buttonName={"good"} buttonValue={props.currentState.good}/>
            <FeedbackValue buttonName={"neutral"} buttonValue={props.currentState.neutral}/>
            <FeedbackValue buttonName={"bad"} buttonValue={props.currentState.bad}/>
            <EvaluationField fieldName={"sum"} evalFun={evalTotal} currentState={props.currentState}/>
            <EvaluationField fieldName={"average"} evalFun={evalAverage} currentState={props.currentState}/>
            <EvaluationField fieldName={"positive"} evalFun={evalPositive} currentState={props.currentState}/>
        </div>
    )
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const currentState = {good: good, neutral: neutral, bad: bad};
    return (
        <>
            <div>
                <SectionHeader message={"give feedback"}/>
                <FeedbackButton buttonName={"good"} buttonValue={good} setFun={setGood}/>
                <FeedbackButton buttonName={"neutral"} buttonValue={neutral} setFun={setNeutral}/>
                <FeedbackButton buttonName={"bad"} buttonValue={bad} setFun={setBad}/>
            </div>
            <Statistics currentState={currentState}/>
        </>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);
