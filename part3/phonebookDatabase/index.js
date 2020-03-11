require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());
morgan.token('payload', (req, res) => req.route !== undefined && req.route.methods.post ? JSON.stringify(req.body) : ' ');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'));

app.get('/info', (request, response) => {
    const date = Date().toString();

    Person
        .find({})
        .then(persons => `Phonebook has info for ${persons.length} people\n\n${date}`)
        .then(textInfo => response.type('text/plain').send(textInfo));
});

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => response.json(persons))
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json(
            {error: "Name or number missing"}
        )
    }

    Person({
        name: body.name,
        number: body.number
    })
        .save()
        .then(newPerson => response.json(newPerson));
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Person
        .findById(id)
        .then(person => response.json(person))
        .catch(() => response.status(404).json({
            error: 'Not found'
        }));
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Person
        .deleteOne({_id: id})
        .then(() => response.status(204).end())
        .catch(() => response.status(404).json({
            error: 'Not found'
        }));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
