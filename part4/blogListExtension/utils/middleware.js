const logger = require('./logger');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformed id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error);
};

module.exports = {
  tokenExtractor,
  errorHandler,
};
