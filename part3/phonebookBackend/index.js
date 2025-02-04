const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

let persons =
    [
        {
            name: "Arto Hellas",
            number: "040-123456",
            id: 1
        },
        {
            name: "Ada Lovelace",
            number: "39-44-5323523",
            id: 2
        },
        {
            name: "Dan Abramov",
            number: "12-43-234345",
            id: 3
        },
        {
            name: "Mary Poppendieck",
            number: "39-23-6423122",
            id: 4
        }
    ];

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());
morgan.token('payload', (req, res) => req.route !== undefined && req.route.methods.post ? JSON.stringify(req.body) : ' ');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'));

app.get('/info', (request, response) => {
    const date = Date().toString();
    const textInfo = `Phonebook has info for ${persons.length} people\n\n${date}`;
    response.type('text/plain').send(textInfo)
});

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json(
            {error: "Name or number missing"}
        )
    }
    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json(
            {error: 'Name must be unique'}
        )
    }

    const id = Math.floor(Math.random() * 10000);
    const person = {
        name: body.name,
        number: body.number,
        id
    };

    persons = persons.concat(person);
    response.json(person)
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person === undefined) {
        response.status(404).json({
            error: 'Not found'
        })
    }
    response.json(person)
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person === undefined) {
        response.status(404).json({
            error: 'Not found'
        })
    }
    persons = persons.filter(p => p.id !== id);
    response.status(204).end()
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
