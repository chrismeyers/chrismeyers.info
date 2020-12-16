import { mount } from '@vue/test-utils';
import DashboardProjects from '@/components/dashboard/DashboardProjects';

describe('DashboardImages', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DashboardProjects);
  });

  it('renders schema labels correctly', async () => {
    const schema = [
      {
        field: 'textInputRequired',
        tag: 'input',
        type: 'text',
        required: true,
      },
      {
        field: 'textInputNotRequired',
        tag: 'input',
        type: 'text',
        required: false,
      },
      {
        field: 'selectRequired',
        tag: 'select',
        multiple: false,
        required: true,
        options: ['a', 'b', 'c'],
      },
    ];

    await wrapper.setData({ schema });

    const el = wrapper.find('form');

    expect(el.findAll('span')).toHaveLength(5);
    expect(el.findAll('span').at(0).html()).toContain(schema[0].field);
    expect(el.findAll('span').at(1).html()).toContain('required-star');
    expect(el.findAll('span').at(2).html()).toContain(schema[1].field);
    expect(el.findAll('span').at(3).html()).toContain(schema[2].field);
    expect(el.findAll('span').at(4).html()).toContain('required-star');
  });

  it('renders schema input fields correctly', async () => {
    const schema = [
      {
        field: 'textInputRequired',
        tag: 'input',
        type: 'text',
        required: true,
      },
      {
        field: 'numberInputRequired',
        tag: 'input',
        type: 'number',
        required: false,
      },
    ];

    await wrapper.setData({ schema });

    const el = wrapper.find('form');

    expect(el.findAll('input').at(0).html()).toContain(
      `placeholder="${schema[0].field}"`,
    );
    expect(el.findAll('input').at(0).html()).toContain('required="required"');
    expect(el.findAll('input').at(0).html()).toContain(
      `type="${schema[0].type}"`,
    );

    expect(el.findAll('input').at(1).html()).toContain(
      `placeholder="${schema[1].field}"`,
    );
    expect(el.findAll('input').at(1).html()).not.toContain(
      'required="required"',
    );
    expect(el.findAll('input').at(1).html()).toContain(
      `type="${schema[1].type}"`,
    );
  });

  it('renders schema select fields correctly', async () => {
    const schema = [
      {
        field: 'images',
        tag: 'select',
        multiple: true,
        required: false,
      },
    ];
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

    await wrapper.setData({ schema, images, selected: { images: [] } });

    const el = wrapper.find('form');

    expect(
      el
        .find('select')
        .findAll('option')
        .wrappers.map((option) => option.text()),
    ).toEqual([
      `Image ${images[0].id}: ${images[0].path}`,
      `Image ${images[1].id}: ${images[1].path}`,
    ]);
  });

  it('selected value is correct', async () => {
    const schema = [
      {
        field: 'images',
        tag: 'select',
        multiple: true,
        required: false,
      },
    ];
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

    await wrapper.setData({ schema, images, selected: { images: [] } });

    const el = wrapper.find('form');
    const options = el.findAll('select option');

    await options.at(0).setSelected();
    await options.at(1).setSelected();
    expect(wrapper.findAll('option').at(0).element.value).toBe('1');
    expect(wrapper.findAll('option').at(1).element.value).toBe('2');
    expect(wrapper.findAll('option').at(0).element.selected).toBe(true);
    expect(wrapper.findAll('option').at(1).element.selected).toBe(true);
  });
});
