const express = require('express');
const logger = require('./logger');

const app = express();
const port = 3000;

// if not using express we'll need claude to provide an example 
// of how to do this with whatever web framework we're using
app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

// route handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start of the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
}); 