const express = require('express');
const app = express();

const persons =
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

app.get('/info', (request, response) => {
    const date = Date().toString();
    const textInfo = `Phonebook has info for ${persons.length} people\n\n${date}`;
    response.type('text/plain').send(textInfo)
});

app.get('/api/persons', (request, response) => {
    response.json(persons)
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
