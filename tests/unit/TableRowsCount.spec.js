import { shallowMount } from '@vue/test-utils';
import TableRowsCount from '@/components/TableRowsCount.vue';

describe('TableRowsCount.vue', () => {
  it('Компонент существует', () => {
    const wrapper = shallowMount(TableRowsCount, {
      propsData: {
        count: 5
      }
    });

    expect(wrapper.isVueInstance()).toEqual(true);
  });

  it('Входной параметр count существует и равен 5', () => {
    const wrapper = shallowMount(TableRowsCount, {
      propsData: {
        count: 5
      }
    });

    expect(wrapper.vm.count).toBeDefined();
    expect(wrapper.vm.count).toBe(5);
  });

  it('При выборе количества строк генерируется событие input, и новое значение равно выбранному', () => {
    const wrapper = shallowMount(TableRowsCount, {
      propsData: {
        count: 5
      }
    });
    const select = wrapper.find('select');

    select.element.value = 20;
    select.trigger('change');

    expect(wrapper.emitted('input').length).toBe(1);
    expect(wrapper.emitted('input')[0]).toEqual([20]);
  });

  it('Содержит список выбор', () => {
    const wrapper = shallowMount(TableRowsCount, {
      propsData: {
        count: 5
      }
    });

    expect(wrapper.exists('select')).toEqual(true);
  });

  it('Список выбора содержит, как минимум, 1 элемент', () => {
    const wrapper = shallowMount(TableRowsCount, {
      propsData: {
        count: 5
      }
    });

    expect(
      wrapper.find('select').findAll('select option').length
    ).toBeGreaterThanOrEqual(1);
  });
});
