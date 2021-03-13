const createApp = require('../../app');

describe('API Endpoints', () => {
  let app;

  beforeAll(() => {
    process.env.CORS_ALLOWED_ORIGINS = 'http://localhost';
  });

  beforeEach(async () => {
    app = await createApp();
  });

  describe('project endpoints', () => {
    it('gets all active projects', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/projects',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(body.items.length).toBeGreaterThan(0);

      const inactive = body.items.filter((p) => !p.active);
      expect(inactive).toHaveLength(0);
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
  });

  describe('build endpoints', () => {
    it('gets all active builds', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/builds',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(body.items.length).toBeGreaterThan(0);

      const inactive = body.items.filter((b) => !b.active);
      expect(inactive).toHaveLength(0);
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
  });

  describe('resume endpoints', () => {
    it('gets full resume', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/resume',
      });

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(Object.keys(body)).toEqual(['experience', 'education', 'skills']);
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
});
