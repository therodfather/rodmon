const logger = require('./logger');

function runJsonDemo() {
  logger.info('Starting JSON logging demo...');


  logger.info('User action completed', {
    userId: 'user123',
    action: 'login',
    timestamp: new Date().toISOString(),
    metadata: {
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0...'
    }
  });

  logger.warn('Resource usage high', {
    resource: 'memory',
    usage: '85%',
    threshold: '80%',
    server: 'web-01',
    timestamp: new Date().toISOString()
  });

  try {
    throw new Error('Database connection failed');
  } catch (err) {
    logger.error('Database operation failed', {
      operation: 'SELECT users',
      database: 'postgres',
      error: err.message,
      stack: err.stack,
      context: {
        query: 'SELECT * FROM users WHERE active = true',
        params: { active: true },
        connectionId: 'conn-456'
      }
    });
  }

  logger.debug('Processing request', {
    requestId: 'req-789',
    method: 'POST',
    url: '/api/users',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer token123'
    },
    body: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    timestamp: new Date().toISOString()
  });

  logger.info('JSON demo complete. Check logs/app.log for structured output.');
}

runJsonDemo(); 