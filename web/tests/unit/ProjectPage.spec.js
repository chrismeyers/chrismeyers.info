import { mount } from '@vue/test-utils';
import ProjectPage from '@/components/ProjectPage';

describe('ProjectPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProjectPage, {
      stubs: ['svgicon'],
      directives: { img: jest.fn() },
    });
  });

  it('displays project details without images correctly', async () => {
    const id = 1;
    const active = true;
    const title = 'Project Name';
    const webUrl = null;
    const codeUrl = 'https://hosted.code';
    const displayDate = 'Test Project, Always and Forever';
    const startedDate = '9999-01-01T00:00:00.000Z';
    const lang = 'Language 1';
    const info = 'Something involving code';
    const role = 'Solo project';
    const stat = 'Being maintained';
    const images = [];

    await wrapper.setData({
      project: {
        id,
        active,
        title,
        webUrl,
        codeUrl,
        displayDate,
        startedDate,
        lang,
        info,
        role,
        stat,
        images,
      },
    });

    const el = wrapper.find('.project');

    expect(el.find('h2').text()).toEqual(title);
    expect(el.find('h3').text()).toEqual(displayDate);

    const dd = el.findAll('div.project-description dd');
    expect(dd.at(0).text()).toEqual(lang);
    expect(dd.at(1).text()).toEqual(info);
    expect(dd.at(2).text()).toEqual(role);
    expect(dd.at(3).text()).toEqual(stat);
    expect(dd.at(4).html()).toContain(`href="${codeUrl}"`);
    expect(dd.at(4).text()).toContain('Code');
    expect(dd.at(4).text()).not.toContain('Website');

    const img = el.find('div.project-images');
    expect(img.exists()).toBe(false);
  });

  it('displays project details with images correctly', async () => {
    const id = 1;
    const active = true;
    const title = 'Project Name';
    const webUrl = 'https://web.site';
    const codeUrl = 'https://hosted.code';
    const displayDate = 'Test Project, Always and Forever';
    const startedDate = '9999-01-01T00:00:00.000Z';
    const lang = 'Language 1';
    const info = 'Something involving code';
    const role = 'Solo project';
    const stat = 'Being maintained';
    const images = [
      {
        id: 1,
        path: '/path/to/1.png',
        thumbnail: null,
        title: 'Image 1',
        pos: 1,
        orient: 'square',
        build: null,
        project: { id: 1 },
      },
      {
        id: 2,
        path: '/path/to/2.png',
        thumbnail: null,
        title: 'Image 2',
        pos: 2,
        orient: 'land',
        build: null,
        project: { id: 1 },
      },
    ];

    await wrapper.setData({
      project: {
        id,
        active,
        title,
        webUrl,
        codeUrl,
        displayDate,
        startedDate,
        lang,
        info,
        role,
        stat,
        images,
      },
    });

    const el = wrapper.find('.project');

    expect(el.find('h2').text()).toEqual(title);
    expect(el.find('h3').text()).toEqual(displayDate);

    const dd = el.findAll('div.project-description dd');
    expect(dd.at(0).text()).toEqual(lang);
    expect(dd.at(1).text()).toEqual(info);
    expect(dd.at(2).text()).toEqual(role);
    expect(dd.at(3).text()).toEqual(stat);
    expect(dd.at(4).html()).toContain(`href="${webUrl}"`);
    expect(dd.at(4).text()).toContain('Website');
    expect(dd.at(5).html()).toContain(`href="${codeUrl}"`);
    expect(dd.at(5).text()).toContain('Code');

    const imageWrapper = el.find('div.project-images');
    expect(imageWrapper.exists()).toBe(true);
    expect(imageWrapper.find('img').html()).toContain(
      `src="${images[0].path}"`,
    );
    expect(imageWrapper.find('img').html()).toContain(
      `alt="${images[0].title}"`,
    );

    const smallImageWrapper = imageWrapper.find('div.project-images-small');
    expect(smallImageWrapper.exists()).toBe(true);
    expect(smallImageWrapper.find('img').html()).toContain(
      `src="${images[1].path}"`,
    );
    expect(smallImageWrapper.find('img').html()).toContain(
      `alt="${images[1].title}"`,
    );
  });

  it('displays gif thumbnail correctly', async () => {
    const images = [
      {
        id: 1,
        path: '/path/to/1.gif',
        thumbnail: '/path/to/1.png',
        title: 'GIF',
        pos: 1,
        orient: 'land',
        build: null,
        project: { id: 1 },
      },
    ];

    await wrapper.setData({ project: { images } });

    const el = wrapper.find('.project');

    const imageWrapper = el.find('div.project-images');
    expect(imageWrapper.exists()).toBe(true);
    expect(imageWrapper.find('img').html()).toContain(
      `src="${images[0].path}"`,
    );
    expect(imageWrapper.find('img').html()).toContain(
      `alt="${images[0].title}"`,
    );
    expect(imageWrapper.find('div.gif-overlay img').html()).toContain(
      `src="${images[0].thumbnail}"`,
    );
    expect(imageWrapper.find('div.gif-overlay').html()).toContain('svgicon');
  });
});
