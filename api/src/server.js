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

    const port = app.config.PORT;
    const addr = app.config.ADDR;

    await app.listen(port, addr);

    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, async () => {
        app.log.warn(`Received ${signal}`);
        try {
          await app.close();
          app.log.warn('Successfully closed server');
        } catch (error) {
          app.log.error(error);
        }
      });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

start();
