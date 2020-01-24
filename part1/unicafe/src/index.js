import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const SectionHeader = (props) => (
    <>
        <h2>{props.message}</h2>
    </>
);

const FeedbackValue = (props) => (
    <tr>
        <td>{props.buttonName}</td>
        <td>{props.buttonValue}</td>
    </tr>
);

const Button = (props) => {
    const incrementButton = () => props.setFun(props.buttonValue + 1);
    return (
        <>
            <button onClick={incrementButton}> {props.buttonName}</button>
        </>
    )
};

const Statistic = (props) => {
    const fieldValue = props.evalFun(props.currentState);
    return (
        <tr>
            <td>{props.fieldName}</td>
            <td>{fieldValue}</td>
        </tr>
    )
};

const Statistics = (props) => {
    const evalTotal = (cs) => cs.good + cs.neutral + cs.bad;
    const evalAverage = (cs) => (cs.good - cs.bad) / evalTotal(cs);
    const evalPositive = (cs) => cs.good / evalTotal(cs) * 100 + " %";

    if (evalTotal(props.currentState) === 0)
        return (
            <div>
                <SectionHeader message={"statistics"}/>
                <p>No feedback given</p>
            </div>
        );

    return (
        <div>
            <SectionHeader message={"statistics"}/>
            <table>
                <tbody>
                    <FeedbackValue buttonName={"good"} buttonValue={props.currentState.good}/>
                    <FeedbackValue buttonName={"neutral"} buttonValue={props.currentState.neutral}/>
                    <FeedbackValue buttonName={"bad"} buttonValue={props.currentState.bad}/>
                    <Statistic fieldName={"sum"} evalFun={evalTotal} currentState={props.currentState}/>
                    <Statistic fieldName={"average"} evalFun={evalAverage} currentState={props.currentState}/>
                    <Statistic fieldName={"positive"} evalFun={evalPositive} currentState={props.currentState}/>
                </tbody>
            </table>
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
                <Button buttonName={"good"} buttonValue={good} setFun={setGood}/>
                <Button buttonName={"neutral"} buttonValue={neutral} setFun={setNeutral}/>
                <Button buttonName={"bad"} buttonValue={bad} setFun={setBad}/>
            </div>
            <Statistics currentState={currentState}/>
        </>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);
