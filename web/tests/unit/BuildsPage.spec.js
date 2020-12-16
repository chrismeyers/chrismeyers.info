import { mount } from '@vue/test-utils';
import BuildsPage from '@/components/BuildsPage';

describe('BuildsPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BuildsPage, { stubs: ['router-link'] });
  });

  it('displays build summary correctly', async () => {
    const id = 1;
    const active = true;
    const displayDate = 'Today - Built for Someone';
    const startedDate = '9999-01-01T00:00:00.000Z';
    const cpu = 'Fast CPU @ 99.9GHz';
    const cool = 'Cold Cooling';
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = 'Fast HDD 9999GB @ 9999rpm';
    const ssd = 'Faster SSD 9999GB';
    const gpu = 'The best GPU 99GB';
    const image = {};

    await wrapper.setData({
      builds: [
        {
          id,
          active,
          displayDate,
          startedDate,
          cpu,
          cool,
          mobo,
          ram,
          hdd,
          ssd,
          gpu,
          image,
        },
      ],
    });

    const el = wrapper.find('.build');

    expect(el.find('h2').html()).toContain(`to="/builds/${id}"`);
    expect(el.find('h2').text()).toContain(displayDate);
    expect(el.find('div.build-overview p').text()).toContain('Fast CPU');
    expect(el.find('div.build-overview p').text()).not.toContain('@ 99.9GHz');
    expect(el.find('div.build-overview').findAll('p').at(1).html()).toContain(
      `to="/builds/${id}"`,
    );
  });
});
