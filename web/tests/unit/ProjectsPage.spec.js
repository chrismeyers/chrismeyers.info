import { mount } from '@vue/test-utils';
import ProjectsPage from '@/components/ProjectsPage';

describe('ProjectsPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProjectsPage, { stubs: ['router-link'] });
  });

  it('displays project summary correctly', async () => {
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
      projects: [
        {
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
      ],
    });

    const el = wrapper.find('.project');

    expect(el.find('h2').html()).toContain(`to="/projects/${id}"`);
    expect(el.find('h2').text()).toContain(title);
    expect(el.find('h3').text()).toEqual(displayDate);
    expect(el.find('div.project-overview p').text()).toEqual(info);
    expect(el.find('div.project-overview').findAll('p').at(1).html()).toContain(
      `to="/projects/${id}"`,
    );
  });
});
