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
    const employed = true;
    const company = 'Somewhere';
    const url = 'https://company.com';
    const title = 'Wizard';
    const dates = ['Jan. 1234', 'Present'];

    await wrapper.setData({
      mostRecentJob: { employed, company, url, title, dates },
      employed,
    });

    const el = wrapper.findComponent({ ref: 'employment' });

    expect(el.exists()).toBe(true);
    expect(el.text()).toContain(title);
    expect(el.text()).toContain(company);
    expect(el.html()).toContain(`href="${url}"`);
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
