import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Numbers from "./components/Numbers";
import AddNumberForm from "./components/AddNumberForm";

const App = () => {
    const personsState = useState(
        [{name: 'Arto Hellas'}]
    );
    const newNameState = useState('');

    return (
        <div>
            <AddNumberForm personsState={personsState} newNameState={newNameState}/>
            <Numbers people={personsState[0]}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
