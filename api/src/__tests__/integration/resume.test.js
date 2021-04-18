const path = require('path');
const { asValue } = require('awilix');
const createApp = require('../../app');
const mockContainer = require('../../__mocks__/mock-container');

describe('Resume API Endpoints', () => {
  let app;

  beforeEach(async () => {
    app = await createApp(mockContainer);
  });

  afterEach(() => app.close());

  it('handles data loading errors when attempting to get full resume', async () => {
    app = await createApp({
      ...mockContainer,
      resumePath: asValue(path.join(__dirname, 'DOES_NOT_EXIST.tex')),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/resume',
    });

    expect(response.statusCode).toBe(500);
  });

  it('gets full resume', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/resume',
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(Object.keys(body)).toEqual(['experience', 'education', 'skills']);
  });

  it('handles data loading errors when attempting to get resume summary', async () => {
    app = await createApp({
      ...mockContainer,
      resumePath: asValue(path.join(__dirname, 'DOES_NOT_EXIST.tex')),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/resume/summary',
    });

    expect(response.statusCode).toBe(500);
  });

  it('gets resume summary', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/resume/summary',
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(Object.keys(body)).toEqual(['languages', 'mostRecentJob']);
  });
});
