import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getPersons = () => axios.get(baseUrl).then((response) => response.data);

const addPerson = (person) => axios.post(baseUrl, person).then((response) => response.data);

const modifyPerson = (person) => axios.put(`${baseUrl}/${person.id}`, person).then((response) => response.data);

const deletePerson = (personId) => axios.delete(`${baseUrl}/${personId}`);

export default {
  getPersons, addPerson, modifyPerson, deletePerson,
};
