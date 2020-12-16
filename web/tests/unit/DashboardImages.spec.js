import { mount } from '@vue/test-utils';
import DashboardImages from '@/components/dashboard/DashboardImages';

describe('DashboardImages', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DashboardImages);
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
        field: 'selectRequired',
        tag: 'select',
        multiple: false,
        required: true,
        options: ['a', 'b', 'c'],
      },
    ];

    await wrapper.setData({ schema });

    const el = wrapper.find('form');

    expect(el.find('select').html()).toContain('required="required"');
    expect(
      el
        .find('select')
        .findAll('option')
        .wrappers.map((option) => option.text()),
    ).toEqual(schema[0].options);
  });

  it('selected value is correct', async () => {
    const schema = [
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
    const options = el.findAll('select option');

    await options.at(0).setSelected();
    expect(wrapper.find('option:checked').element.value).toBe('a');
    await options.at(1).setSelected();
    expect(wrapper.find('option:checked').element.value).toBe('b');
    await options.at(2).setSelected();
    expect(wrapper.find('option:checked').element.value).toBe('c');
  });
});
