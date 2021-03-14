const createProjectService = require('../../lib/project-service');
const mockDataLoader = require('../../__mocks__/mock-data-loader');

describe('Project Service', () => {
  let service;

  beforeEach(async () => {
    service = await createProjectService(mockDataLoader);
  });

  it('returns all active projects', async () => {
    const data = await service.active();

    expect(data).toHaveLength(1);
  });

  it('returns an active project', async () => {
    const data = await service.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive project', async () => {
    const data = await service.findById(2);

    expect(data).toBeUndefined();
  });

  it('does not return a project that does not exist', async () => {
    const data = await service.findById(1337);

    expect(data).toBeUndefined();
  });
});
