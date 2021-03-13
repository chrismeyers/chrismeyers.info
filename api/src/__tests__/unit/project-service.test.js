const createProjectService = require('../../lib/project-service');

describe('Project Service', () => {
  let service;
  const projects = [
    {
      id: 1,
      active: true,
      title: 'Project 1',
      webUrl: null,
      codeUrl: 'https://site.code',
      displayDate: 'Something, Somewhere',
      startedDate: '2021-03-12T00:00:00.000Z',
      lang: 'Binary',
      info: 'Does stuff and things',
      role: 'Everything',
      stat: 'Complete',
      images: [
        {
          id: 1,
          path: '/path/to/image.png',
          thumbnail: null,
          title: 'Exciting picture',
          pos: 1,
          orient: 'land',
        },
      ],
    },
    {
      id: 2,
      active: false,
      title: 'Project 2',
      webUrl: 'https://site.demo',
      codeUrl: 'https://site.code',
      displayDate: 'Something, Somewhere',
      startedDate: '2021-03-12T00:00:00.000Z',
      lang: 'Assembly',
      info: 'Does even more stuff and things',
      role: 'Nothing',
      stat: 'Yes',
      images: [],
    },
  ];

  beforeEach(async () => {
    service = await createProjectService(projects);
  });

  it('returns all active projects', async () => {
    const data = service.active();

    expect(data).toHaveLength(1);
  });

  it('returns an active project', async () => {
    const data = service.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive project', async () => {
    const data = service.findById(2);

    expect(data).toBeUndefined();
  });

  it('does not return a project that does not exist', async () => {
    const data = service.findById(1337);

    expect(data).toBeUndefined();
  });
});
