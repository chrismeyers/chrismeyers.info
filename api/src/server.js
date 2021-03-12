require('dotenv').config();
const createApp = require('./app');

const start = async () => {
  let app = null;

  try {
    app = createApp({
      logger: {
        level: 'info',
        prettyPrint: process.env.NODE_ENV === 'development',
      },
    });
    const port = process.env.PORT || 8888;

    await app.listen(port);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
