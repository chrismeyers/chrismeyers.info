import { mount } from '@vue/test-utils';
import ResumePage from '@/components/ResumePage';

describe('ResumePage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ResumePage);
  });

  it('displays experience section correctly', async () => {
    const url = 'https://company.com';
    const firstLine = ['Somewhere', 'Anywhere, Earth'];
    const secondLine = [['Wizard', 'Jan. 1234 &ndash; Present']];
    const info = [['Did this thing', 'Did that thing']];

    await wrapper.setData({
      experience: [{ url, firstLine, secondLine, info }],
    });

    expect(wrapper.find('.company').text()).toEqual(firstLine[0]);
    expect(wrapper.find('.company').html()).toContain(`href="${url}"`);
    expect(wrapper.find('.location').text()).toEqual(firstLine[1]);
    expect(wrapper.find('.job-title').text()).toEqual(secondLine[0][0]);
    expect(wrapper.find('.tenure').text()).toEqual('Jan. 1234 \u2013 Present');
    expect(
      wrapper
        .find('ul.more-info')
        .findAll('li')
        .wrappers.map((li) => li.text()),
    ).toEqual(info[0]);
  });

  it('displays multiple experience at some company correctly', async () => {
    const url = 'https://company.com';
    const firstLine = ['Somewhere', 'Anywhere, Earth'];
    const secondLine = [
      ['Wizard', 'Jan. 1234 &ndash; Present'],
      ['Sorcerer', 'Jan. 1000 &ndash; Dec. 1233'],
    ];
    const info = [
      ['Did this thing as a wizard', 'Did that thing as a wizard'],
      ['Did this thing as a sorcerer', 'Did that thing as a sorcerer'],
    ];

    await wrapper.setData({
      experience: [{ url, firstLine, secondLine, info }],
    });

    expect(wrapper.find('.company').text()).toEqual(firstLine[0]);
    expect(wrapper.find('.company').html()).toContain(`href="${url}"`);
    expect(wrapper.find('.location').text()).toEqual(firstLine[1]);
    expect(wrapper.findAll('.job-title').at(0).text()).toEqual(
      secondLine[0][0],
    );
    expect(wrapper.findAll('.tenure').at(0).text()).toEqual(
      'Jan. 1234 \u2013 Present',
    );
    expect(wrapper.findAll('.job-title').at(1).text()).toEqual(
      secondLine[1][0],
    );
    expect(wrapper.findAll('.tenure').at(1).text()).toEqual(
      'Jan. 1000 \u2013 Dec. 1233',
    );
    expect(
      wrapper
        .findAll('ul.more-info')
        .at(0)
        .findAll('li')
        .wrappers.map((li) => li.text()),
    ).toEqual(info[0]);
    expect(
      wrapper
        .findAll('ul.more-info')
        .at(1)
        .findAll('li')
        .wrappers.map((li) => li.text()),
    ).toEqual(info[1]);
  });

  it('displays education section correctly', async () => {
    const url = 'https://school.edu';
    const firstLine = ['Degree', 'Somewhere, Earth'];
    const secondLine = [['School', 'Jan. 9999 &ndash; Dec. 9999']];
    const info = [[]];

    await wrapper.setData({
      education: [{ url, firstLine, secondLine, info }],
    });

    expect(wrapper.find('.degree').text()).toEqual(firstLine[0]);
    expect(wrapper.find('.location').text()).toEqual(firstLine[1]);
    expect(wrapper.find('.school').text()).toEqual(secondLine[0][0]);
    expect(wrapper.find('.tenure').text()).toEqual(
      'Jan. 9999 \u2013 Dec. 9999',
    );
  });

  it('displays skills section correctly', async () => {
    const skills = [
      {
        mainItem: 'Multiple subitems',
        subItems: ['Sub 1', 'Sub 2'],
      },
      {
        mainItem: 'One subitem',
        subItems: ['Sub 3'],
      },
      {
        mainItem: 'No subitems',
        subItems: [],
      },
    ];

    await wrapper.setData({ skills });

    const el = wrapper.findComponent({ ref: 'skills' });

    expect(el.findAll('li.skill-wrapper').at(0).text()).toContain(
      'Multiple subitems',
    );
    expect(
      el
        .findAll('li.skill-wrapper')
        .at(0)
        .find('ul')
        .findAll('li')
        .wrappers.map((li) => li.text()),
    ).toEqual(skills[0].subItems);

    expect(el.findAll('li.skill-wrapper').at(1).text()).toContain(
      'One subitem',
    );
    expect(
      el
        .findAll('li.skill-wrapper')
        .at(1)
        .find('ul')
        .findAll('li')
        .wrappers.map((li) => li.text()),
    ).toEqual(skills[1].subItems);

    expect(el.findAll('li.skill-wrapper').at(2).text()).toContain(
      'No subitems',
    );
    expect(el.findAll('li.skill-wrapper').at(2).find('ul').exists()).toBe(
      false,
    );
  });
});
