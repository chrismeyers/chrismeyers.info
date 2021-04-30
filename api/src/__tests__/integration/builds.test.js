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
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'Unable to load data',
      }),
    );
  });

  it('gets all active builds', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/builds',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      items: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          active: expect.any(Boolean),
          displayDate: expect.any(String),
          startedDate: expect.any(String),
          cpu: expect.any(String),
          cool: expect.toBeOneOf([expect.any(String), null]),
          mobo: expect.any(String),
          ram: expect.any(String),
          hdd: expect.any(String),
          ssd: expect.toBeOneOf([expect.any(String), null]),
          gpu: expect.any(String),
          image: expect.objectContaining({
            id: expect.any(Number),
            path: expect.any(String),
            thumbnail: expect.toBeOneOf([expect.any(String), null]),
            title: expect.any(String),
            pos: expect.any(Number),
            orient: expect.any(String),
          }),
        }),
      ]),
    });
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
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'Unable to load data',
      }),
    );
  });

  it('handles an invalid ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/builds/apples',
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'params.id should be number',
      }),
    );
  });

  it('handles an unknown ID', async () => {
    const id = 12345;

    const response = await app.inject({
      method: 'GET',
      url: `/builds/${id}`,
    });

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: `Build ${id} not found`,
      }),
    );
  });

  it('gets a single build by ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/builds/1',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        active: expect.any(Boolean),
        displayDate: expect.any(String),
        startedDate: expect.any(String),
        cpu: expect.any(String),
        cool: expect.toBeOneOf([expect.any(String), null]),
        mobo: expect.any(String),
        ram: expect.any(String),
        hdd: expect.any(String),
        ssd: expect.toBeOneOf([expect.any(String), null]),
        gpu: expect.any(String),
        image: expect.objectContaining({
          id: expect.any(Number),
          path: expect.any(String),
          thumbnail: expect.toBeOneOf([expect.any(String), null]),
          title: expect.any(String),
          pos: expect.any(Number),
          orient: expect.any(String),
        }),
      }),
    );
  });
});
