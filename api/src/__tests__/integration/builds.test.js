const { asFunction } = require('awilix');
const createApp = require('../../app');
const mockContainer = require('../../__mocks__/mock-container');

describe('Build API Endpoints', () => {
  let app;

  beforeEach(async () => {
    app = await createApp(mockContainer);
  });

  afterEach(() => app.close());

  it('handles data loading errors when attempting to get all active builds', async () => {
    app = await createApp({
      ...mockContainer,
      buildRepository: asFunction(() => null),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/builds',
    });

    expect(response.statusCode).toBe(500);
  });

  it('gets all active builds', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/builds',
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.items.length).toBeGreaterThan(0);

    expect(body.items[0].displayDate).toBe('Sometime');

    const inactive = body.items.filter((b) => !b.active);
    expect(inactive).toHaveLength(0);
  });

  it('handles data loading errors when attempting to get a single build', async () => {
    app = await createApp({
      ...mockContainer,
      buildRepository: asFunction(() => null),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/builds/1',
    });

    expect(response.statusCode).toBe(500);
  });

  it('handles an invalid ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/builds/apples',
    });

    expect(response.statusCode).toBe(400);
  });

  it('handles an unknown ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/builds/12345',
    });

    expect(response.statusCode).toBe(404);
  });

  it('gets a single build by ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/builds/1',
    });

    expect(response.statusCode).toBe(200);
  });
});
