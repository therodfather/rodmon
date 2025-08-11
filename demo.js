const logger = require('./logger');

function runDemo() {
  logger.info('Starting logging demo...');

  logger.info('Info with metadata: user=%s action=%s', 'alice', 'login');
  logger.warn('Low disk space on drive %s: %d%% remaining', 'C', 12);
  logger.debug('Debug details: %j', { featureFlag: true, attempt: 3 });

  try {
    throw new Error('Example error for demo');
  } catch (err) {
    logger.error('An error occurred in demo', err);
  }

  logger.info('Demo complete.');
}

runDemo(); 