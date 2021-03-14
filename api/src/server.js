require('dotenv').config();
const createApp = require('./app');

const start = async () => {
  let app = null;

  try {
    app = await createApp({
      logger: {
        level: 'info',
        prettyPrint: process.env.NODE_ENV === 'development',
      },
    });

    const port = app.config.PORT || 8888;
    const addr = app.config.ADDR || '127.0.0.1';

    await app.listen(port, addr);
  } catch (err) {
    if (app) {
      app.log.error(err);
    } else {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    process.exit(1);
  }
};

start();
