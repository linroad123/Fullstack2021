const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",});
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired"
    })
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      return authorization.substring(7);
    }
    return null;
  };
  request.token = getTokenFrom(request);
  next();
};

const userExtractor = async (request, response,next) => {
  const getUserFromToken =  (request) => {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      // return null;
      return response.status(401).json({ error: "token missing or invalid" });
    }
    return  User.findById(decodedToken.id);
  };
  request.user = await getUserFromToken(request);
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
