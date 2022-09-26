require("dotenv").config();
const PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URL;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URL
}

module.exports = {
  MONGODB_URI,
  PORT,
};
