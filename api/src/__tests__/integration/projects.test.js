const { asFunction } = require('awilix');
const createApp = require('../../app');
const mockContainer = require('../../__mocks__/mock-container');

describe('Project API Endpoints', () => {
  let app;

  beforeEach(async () => {
    app = await createApp(mockContainer);
  });

  afterEach(() => app.close());

  it('handles data loading errors when attempting to get all active projects', async () => {
    app = await createApp({
      ...mockContainer,
      projectRepository: asFunction(() => null),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/projects',
    });

    expect(response.statusCode).toBe(500);
  });

  it('gets all active projects', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects',
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.items.length).toBeGreaterThan(0);

    expect(body.items[0].title).toBe('Project 1');

    const inactive = body.items.filter((p) => !p.active);
    expect(inactive).toHaveLength(0);
  });

  it('handles data loading errors when attempting to get a single project', async () => {
    app = await createApp({
      ...mockContainer,
      projectRepository: asFunction(() => null),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/projects/1',
    });

    expect(response.statusCode).toBe(500);
  });

  it('handles an invalid ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/apples',
    });

    expect(response.statusCode).toBe(400);
  });

  it('handles an unknown ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/12345',
    });

    expect(response.statusCode).toBe(404);
  });

  it('gets a single project by ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/1',
    });

    expect(response.statusCode).toBe(200);
  });
});
