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

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const currentState = {good: good, neutral: neutral, bad: bad};
    const evalTotal = (cs) => cs.good + cs.neutral + cs.bad;
    const evalAverage = (cs) => (cs.good - cs.bad) / evalTotal(cs);
    const evalPositive = (cs) => cs.good / evalTotal(cs) * 100 + " %";

    return (
        <>
            <div>
                <SectionHeader message={"give feedback"}/>
                <FeedbackButton buttonName={"good"} buttonValue={good} setFun={setGood}/>
                <FeedbackButton buttonName={"neutral"} buttonValue={neutral} setFun={setNeutral}/>
                <FeedbackButton buttonName={"bad"} buttonValue={bad} setFun={setBad}/>
            </div>
            <div>
                <SectionHeader message={"statistics"}/>
                <FeedbackValue buttonName={"good"} buttonValue={good}/>
                <FeedbackValue buttonName={"neutral"} buttonValue={neutral}/>
                <FeedbackValue buttonName={"bad"} buttonValue={bad}/>
                <EvaluationField fieldName={"sum"} evalFun={evalTotal} currentState={currentState}/>
                <EvaluationField fieldName={"average"} evalFun={evalAverage} currentState={currentState}/>
                <EvaluationField fieldName={"positive"} evalFun={evalPositive} currentState={currentState}/>
            </div>
        </>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);
