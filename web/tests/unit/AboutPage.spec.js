import { mount } from '@vue/test-utils';
import AboutPage from '@/components/AboutPage';

describe('AboutPage', () => {
  it('passes a simple sanity check', () => {
    const wrapper = mount(AboutPage, {
      stubs: ['router-link'],
      directives: { img: jest.fn() },
    });
    expect(wrapper.text()).toMatch('About');
  });
});
