const fs = require('fs').promises;
const path = require('path');

module.exports = async () => {
  const data = await fs.readFile(
    path.join(__dirname, '..', 'data', 'data.json'),
  );
  return JSON.parse(data);
};
