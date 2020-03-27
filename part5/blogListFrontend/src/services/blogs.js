import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setUser = (userToken) => {
  token = userToken !== null ? `Bearer ${userToken}` : null;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const createBlog = (title, author, url) => {
  const payload = {
    title,
    author,
    url
  };
  const config = { headers: { Authorization: token } };

  const request = axios.post(baseUrl, payload, config);
  return request.then(response => response.data);
};

export default {
  setUser,
  getAll,
  createBlog
};
