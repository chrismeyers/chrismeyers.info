const { asFunction } = require('awilix');
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
      resumeParser: asFunction(() => null),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/resume',
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'Unable to load resume file',
      }),
    );
  });

  it('gets full resume', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/resume',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        experience: expect.arrayContaining([
          expect.objectContaining({
            url: expect.any(String),
            firstLine: expect.any(Array),
            secondLine: expect.any(Array),
            info: expect.any(Array),
          }),
        ]),
        education: expect.arrayContaining([
          expect.objectContaining({
            url: expect.any(String),
            firstLine: expect.any(Array),
            secondLine: expect.any(Array),
            info: expect.any(Array),
          }),
        ]),
        skills: expect.arrayContaining([
          expect.objectContaining({
            mainItem: expect.any(String),
            subItems: expect.any(Array),
          }),
        ]),
      }),
    );
  });

  it('handles data loading errors when attempting to get resume summary', async () => {
    app = await createApp({
      ...mockContainer,
      resumeParser: asFunction(() => null),
    });

    const response = await app.inject({
      method: 'GET',
      url: '/resume/summary',
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'Unable to load resume file',
      }),
    );
  });

  it('gets resume summary', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/resume/summary',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        languages: expect.objectContaining({
          desktop: expect.any(Array),
          web: expect.any(Array),
        }),
        mostRecentJob: expect.objectContaining({
          employed: expect.any(Boolean),
          company: expect.any(String),
          url: expect.any(String),
          title: expect.any(String),
          dates: expect.any(Array),
        }),
      }),
    );
  });
});
