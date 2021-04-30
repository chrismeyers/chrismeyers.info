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
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'Unable to load data',
      }),
    );
  });

  it('gets all active projects', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      items: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          active: expect.any(Boolean),
          title: expect.any(String),
          webUrl: expect.toBeOneOf([expect.any(String), null]),
          codeUrl: expect.any(String),
          displayDate: expect.any(String),
          startedDate: expect.any(String),
          lang: expect.any(String),
          info: expect.any(String),
          role: expect.any(String),
          stat: expect.any(String),
          images: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              path: expect.any(String),
              thumbnail: expect.toBeOneOf([expect.any(String), null]),
              title: expect.any(String),
              pos: expect.any(Number),
              orient: expect.any(String),
            }),
          ]),
        }),
      ]),
    });
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
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'Unable to load data',
      }),
    );
  });

  it('handles an invalid ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/apples',
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
      url: `/projects/${id}`,
    });

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: `Project ${id} not found`,
      }),
    );
  });

  it('gets a single project by ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/1',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        active: expect.any(Boolean),
        title: expect.any(String),
        webUrl: expect.toBeOneOf([expect.any(String), null]),
        codeUrl: expect.any(String),
        displayDate: expect.any(String),
        startedDate: expect.any(String),
        lang: expect.any(String),
        info: expect.any(String),
        role: expect.any(String),
        stat: expect.any(String),
        images: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            path: expect.any(String),
            thumbnail: expect.toBeOneOf([expect.any(String), null]),
            title: expect.any(String),
            pos: expect.any(Number),
            orient: expect.any(String),
          }),
        ]),
      }),
    );
  });
});
