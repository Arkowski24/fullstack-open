import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = (userToken) => {
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

const modifyBlog = (modifiedBlog) => {
  const config = { headers: { Authorization: token } };

  const request = axios.put(`${baseUrl}/${modifiedBlog.id}`, modifiedBlog, config);
  return request.then(response => response.data);
};

const deleteBlog = (blogId) => {
  const config = { headers: { Authorization: token } };
  return axios.delete(`${baseUrl}/${blogId}`, config);
};

export default {
  setToken,
  getAll,
  createBlog,
  modifyBlog,
  deleteBlog
};
