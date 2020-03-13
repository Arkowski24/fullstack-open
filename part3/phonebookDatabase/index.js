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
morgan.token('payload', (req) => (req.route !== undefined && req.route.methods.post ? JSON.stringify(req.body) : ' '));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'));

app.get('/info', (request, response) => {
  const date = Date().toString();

  Person
    .find({})
    .then((persons) => `Phonebook has info for ${persons.length} people\n\n${date}`)
    .then((textInfo) => response.type('text/plain').send(textInfo));
});

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then((persons) => response.json(persons));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  Person({
    name: body.name,
    number: body.number,
  })
    .save()
    .then((newPerson) => response.json(newPerson))
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;

  Person
    .findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).json({ error: 'Not found' });
      }
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person
    .findByIdAndUpdate(id, person, { new: true })
    .then((newPerson) => {
      if (newPerson) {
        response.json(newPerson);
      } else {
        response.status(404).json({ error: 'Not found' });
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;

  Person
    .findByIdAndRemove({ _id: id })
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformed id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
