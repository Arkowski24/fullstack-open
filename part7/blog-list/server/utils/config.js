require('dotenv').config();

const { PORT } = process.env;
let { MONGODB_URI } = process.env;
const { SECRET } = process.env;

if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.DEV_MONGODB_URI;
}
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
