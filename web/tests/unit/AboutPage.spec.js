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

    expect(el.text().replace(/\s/g, '')).toMatch(
      'Currently, I am employed as a Wizard at Somewhere'.replace(/\s/g, ''),
    );

    expect(el.html()).toContain('href="https://company.com"');
  });

  it('displays language experience', async () => {
    await wrapper.setData({
      languages: {
        desktop: ['Language 1', 'Language 2'],
        web: ['Language 3', 'Language 4'],
      },
    });

    expect(
      wrapper
        .findComponent({ ref: 'desktop-languages' })
        .html()
        .replace(/\s/g, ''),
    ).toMatch(
      `<ul>
        <li>Language 1</li>
        <li>Language 2</li>
      </ul>`.replace(/\s/g, ''),
    );

    expect(
      wrapper.findComponent({ ref: 'web-languages' }).html().replace(/\s/g, ''),
    ).toMatch(
      `<ul>
        <li>Language 3</li>
        <li>Language 4</li>
      </ul>`.replace(/\s/g, ''),
    );
  });
});
