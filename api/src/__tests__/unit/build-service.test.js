const createBuildService = require('../../lib/build-service');

describe('Build Service', () => {
  let service;
  const builds = [
    {
      id: 1,
      active: true,
      displayDate: 'Sometime',
      startedDate: '2021-03-12T00:00:00.000Z',
      cpu: 'Very Fast',
      cool: null,
      mobo: 'Lots of LEDs',
      ram: 'Much',
      hdd: 'Nope',
      ssd: 'Fast',
      gpu: 'Sold out',
      image: {
        id: 1,
        path: '/path/to/image.jpg',
        thumbnail: null,
        title: 'Shiny',
        pos: 1,
        orient: 'land',
      },
    },
    {
      id: 2,
      active: false,
      displayDate: 'Some other time',
      startedDate: '2021-03-12T00:00:00.000Z',
      cpu: 'Faster',
      cool: null,
      mobo: 'Not as many LEDs',
      ram: 'Some',
      hdd: 'Yes',
      ssd: 'No',
      gpu: 'Still sold out',
      image: null,
    },
  ];

  beforeEach(async () => {
    service = await createBuildService(builds);
  });

  it('returns all active builds', async () => {
    const data = service.active();

    expect(data).toHaveLength(1);
  });

  it('returns an active build', async () => {
    const data = service.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive build', async () => {
    const data = service.findById(2);

    expect(data).toBeUndefined();
  });

  it('does not return a build that does not exist', async () => {
    const data = service.findById(1337);

    expect(data).toBeUndefined();
  });
});
