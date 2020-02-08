import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Numbers from "./components/Numbers";
import AddNumberForm from "./components/AddNumberForm";

const App = () => {
    const personsState = useState(
        [{
            name: 'Arto Hellas',
            number: '040-1234567'
        }]
    );

    return (
        <div>
            <AddNumberForm personsState={personsState}/>
            <Numbers people={personsState[0]}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
