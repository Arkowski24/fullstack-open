require('dotenv')
  .config();

let { MONGODB_URI, JWT_SECRET } = process.env;

module.exports = {
  MONGODB_URI,
  JWT_SECRET
};
