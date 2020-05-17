import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const payload = {
    content,
    votes: 0
  };
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

const update = async ({ id, content, votes }) => {
  const payload = {
    content,
    votes
  };
  const response = await axios.put(`${baseUrl}/${id}`, payload);
  return response.data;
};

export default {
  getAll,
  create,
  update
};
