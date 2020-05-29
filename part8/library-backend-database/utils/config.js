require('dotenv')
  .config();

let { MONGODB_URI } = process.env;

module.exports = {
  MONGODB_URI,
};
