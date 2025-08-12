const express = require('express');
const logger = require('./logger');

const app = express();
const port = 3000;

function generateRequestId() {
  return Math.random().toString(36).slice(2, 10);
}

app.use((req, res, next) => {
  const requestId = generateRequestId();
  const startHr = process.hrtime.bigint();
  req.requestId = requestId;

  logger.info('[%s] Request received: %s %s', requestId, req.method, req.url);

  res.on('finish', () => {
    const endHr = process.hrtime.bigint();
    const durationMs = Number(endHr - startHr) / 1_000_000;
    logger.info('[%s] Response sent: %s %s %d (%d ms)', requestId, req.method, req.originalUrl, res.statusCode, durationMs.toFixed(2));
  });

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/debug', (req, res) => {
  logger.debug('[%s] Debug route hit with headers: %j', req.requestId, req.headers);
  res.json({ ok: true, message: 'Debug log emitted. Set LOG_LEVEL=debug to see it.' });
});

app.get('/warn', (req, res) => {
  logger.warn('[%s] This is a warning about a deprecated endpoint', req.requestId);
  res.json({ ok: true, message: 'Warning log emitted.' });
});

app.get('/error', (req, res) => {
  try {
    throw new Error('Simulated failure in /error endpoint');
  } catch (err) {
    logger.error('Endpoint error occurred', {
      requestId: req.requestId,
      endpoint: '/error',
      method: req.method,
      error: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ ok: false, message: 'An error was logged with a stack trace.' });
  }
});

app.get('/work', async (req, res) => {
  const workMs = Math.floor(Math.random() * 400) + 100; // 100-500ms
  logger.info('Starting simulated work', {
    requestId: req.requestId,
    endpoint: '/work',
    durationMs: workMs,
    timestamp: new Date().toISOString()
  });
  await new Promise((r) => setTimeout(r, workMs));
  logger.info('Finished simulated work', {
    requestId: req.requestId,
    endpoint: '/work',
    actualDurationMs: workMs,
    timestamp: new Date().toISOString()
  });
  res.json({ ok: true, durationMs: workMs });
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  logger.info('Try the demo routes: /debug, /warn, /error, /work');
}); 