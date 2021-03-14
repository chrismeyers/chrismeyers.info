const fs = require('fs').promises;
const dataLoader = require('../../lib/data-loader');

describe('Data Loader', () => {
  it('returns entire parsed JSON object', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockReturnValue('{"a":1,"b":2}');

    const data = await dataLoader();

    expect(spy).toHaveBeenCalled();
    expect(data).toEqual({ a: 1, b: 2 });
  });

  it('returns parsed JSON sub object', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockReturnValue('{"a":{"b":2}}');

    const data = await dataLoader('a');

    expect(spy).toHaveBeenCalled();
    expect(data).toEqual({ b: 2 });
  });
});
