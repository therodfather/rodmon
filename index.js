const express = require('express');
const logger = require('./logger');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
}); 