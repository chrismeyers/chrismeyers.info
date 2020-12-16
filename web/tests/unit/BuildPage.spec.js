import { mount } from '@vue/test-utils';
import BuildPage from '@/components/BuildPage';

describe('BuildPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BuildPage, { directives: { img: jest.fn() } });
  });

  it('displays build details without image correctly', async () => {
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
    const image = null;

    await wrapper.setData({
      build: {
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
    });

    const el = wrapper.find('.build');

    expect(el.find('h2').text()).toEqual(displayDate);

    const dd = el.findAll('div.build-specs dd');
    expect(dd.at(0).text()).toEqual(cpu);
    expect(dd.at(1).text()).toEqual(cool);
    expect(dd.at(2).text()).toEqual(mobo);
    expect(dd.at(3).text()).toEqual(ram);
    expect(dd.at(4).text()).toEqual(hdd);
    expect(dd.at(5).text()).toEqual(ssd);
    expect(dd.at(6).text()).toEqual(gpu);

    const img = el.find('div.build-pic');
    expect(img.exists()).toBe(false);
  });

  it('displays build details with image correctly', async () => {
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
    const image = {
      id: 1,
      path: '/path/to/1.png',
      thumbnail: null,
      title: 'Image 1',
      pos: 1,
      orient: 'land',
      build: { id: 1 },
      project: null,
    };

    await wrapper.setData({
      build: {
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
    });

    const el = wrapper.find('.build');

    expect(el.find('h2').text()).toEqual(displayDate);

    const dd = el.findAll('div.build-specs dd');
    expect(dd.at(0).text()).toEqual(cpu);
    expect(dd.at(1).text()).toEqual(cool);
    expect(dd.at(2).text()).toEqual(mobo);
    expect(dd.at(3).text()).toEqual(ram);
    expect(dd.at(4).text()).toEqual(hdd);
    expect(dd.at(5).text()).toEqual(ssd);
    expect(dd.at(6).text()).toEqual(gpu);

    const imageWrapper = el.find('div.build-pic');
    expect(imageWrapper.exists()).toBe(true);
    expect(imageWrapper.find('img').html()).toContain(`src="${image.path}"`);
    expect(imageWrapper.find('img').html()).toContain(`alt="${image.title}"`);
  });
});
