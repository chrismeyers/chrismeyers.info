import { mount } from '@vue/test-utils';
import AboutPage from '@/components/AboutPage';

describe('AboutPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AboutPage, {
      stubs: ['router-link'],
      directives: { img: jest.fn() },
    });
  });

  it('excludes employment info is not currently employed', async () => {
    await wrapper.setData({ employed: false });

    expect(wrapper.findComponent({ ref: 'employment' }).exists()).toBe(false);
  });

  it('displays current job if currently employed', async () => {
    await wrapper.setData({
      mostRecentJob: {
        employed: true,
        company: 'Somewhere',
        url: 'https://company.com',
        title: 'Wizard',
        dates: ['Jan. 1234', 'Present'],
      },
      employed: true,
    });

    const el = wrapper.findComponent({ ref: 'employment' });

    expect(el.exists()).toBe(true);
    expect(el.text()).toContain('Wizard');
    expect(el.text()).toContain('Somewhere');
    expect(el.html()).toContain('href="https://company.com"');
  });

  it('displays language experience', async () => {
    const desktop = ['Language 1', 'Language 2'];
    const web = ['Language 3', 'Language 4'];
    await wrapper.setData({ languages: { desktop, web } });

    let el = wrapper.findComponent({ ref: 'desktop-languages' });

    expect(el.findAll('li').wrappers.map((li) => li.text())).toEqual(desktop);

    el = wrapper.findComponent({ ref: 'web-languages' });

    expect(el.findAll('li').wrappers.map((li) => li.text())).toEqual(web);
  });
});
