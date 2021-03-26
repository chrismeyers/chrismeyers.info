const createBuildRepository = require('../../lib/build-repository');
const mockDataLoader = require('../../__mocks__/mock-data-loader');

describe('Build Repository', () => {
  let repo;

  beforeEach(async () => {
    repo = await createBuildRepository(mockDataLoader);
  });

  it('returns all active builds', async () => {
    const data = await repo.active();

    expect(data).toHaveLength(1);
  });

  it('returns an active build', async () => {
    const data = await repo.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive build', async () => {
    const data = await repo.findById(2);

    expect(data).toBeUndefined();
  });

  it('does not return a build that does not exist', async () => {
    const data = await repo.findById(1337);

    expect(data).toBeUndefined();
  });
});
