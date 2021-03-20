require('dotenv').config();
const process = require('process');
const createApp = require('./app');
const container = require('./container');

const start = async () => {
  try {
    const app = await createApp(container, {
      logger: {
        level: 'info',
        prettyPrint: process.env.NODE_ENV === 'development',
      },
    });

    const port = app.config.PORT || 8888;
    const addr = app.config.ADDR || '127.0.0.1';

    await app.listen(port, addr);

    process.on('SIGTERM', () => {
      app.log.warn('Received SIGTERM');
      app.close();
    });
    process.on('SIGINT', () => {
      app.log.warn('Received SIGINT');
      app.close();
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

start();
