const fs = require('fs').promises;
const path = require('path');

module.exports = async (type = null) => {
  const data = await fs.readFile(
    path.join(__dirname, '..', 'data', 'data.json'),
  );
  const obj = JSON.parse(data);

  return type ? obj[type] : obj;
};
