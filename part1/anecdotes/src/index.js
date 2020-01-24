import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const NextButton = (props) => {
    const randomFromRange = () => {
        const len = props.anecdotes.length;
        return Math.floor(Math.random() * len);
    };

    return (
        <>
            <button onClick={() => props.setSelected(randomFromRange())}>next anecdote</button>
        </>
    )
};

const VoteButton = (props) => {
    const addVote = () => {
        const newVotes = [...props.votes];
        newVotes[props.selected] += 1;
        props.setVotes(newVotes);
    };

    return (
        <>
            <button onClick={addVote}>vote</button>
        </>
    )
};

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(anecdotes.map(() => 0));

    return (
        <>
            <div>
                {props.anecdotes[selected]}<br/>
                has {votes[selected]} votes
            </div>
            <div>
                <NextButton anecdotes={anecdotes} setSelected={setSelected}/>
                <VoteButton selected={selected} votes={votes} setVotes={setVotes}/>
            </div>
        </>
    )
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
);
