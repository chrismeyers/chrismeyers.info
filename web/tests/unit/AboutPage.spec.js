import { mount } from '@vue/test-utils';
import AboutPage from '@/components/AboutPage';
import { compress } from '../utils';

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

    expect(compress(el.text())).toMatch(
      compress('Currently, I am employed as a Wizard at Somewhere'),
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
      compress(wrapper.findComponent({ ref: 'desktop-languages' }).html()),
    ).toMatch(
      compress(
        `<ul>
          <li>Language 1</li>
          <li>Language 2</li>
        </ul>`,
      ),
    );

    expect(
      compress(wrapper.findComponent({ ref: 'web-languages' }).html()),
    ).toMatch(
      compress(
        `<ul>
          <li>Language 3</li>
          <li>Language 4</li>
        </ul>`,
      ),
    );
  });
});
