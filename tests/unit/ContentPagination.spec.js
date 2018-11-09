import { shallowMount } from '@vue/test-utils';
import ContentPagination from '@/components/ContentPagination.vue';

describe('ContentPagination.vue', () => {
  it('Компонент существует', () => {
    const wrapper = shallowMount(ContentPagination, {
      propsData: {
        page: 1,
        total: 50,
        limit: 5
      }
    });

    expect(wrapper.isVueInstance()).toEqual(true);
  });

  it('Нажатие по кнопкам пагинатора генерирует событие pagination-click', () => {
    const wrapper = shallowMount(ContentPagination, {
      propsData: {
        page: 1,
        total: 50,
        limit: 5
      },
      mocks: {
        $route: { name: 'users', page: 1 }
      }
    });

    const pageLink = wrapper.find('.page-link');

    pageLink.trigger('click');
    expect(wrapper.emitted('pagination-click').length).toBe(1);
  });

  it('Кнопка предыдущей страницы недоступна, если текущая равна 1', () => {
    const wrapper = shallowMount(ContentPagination, {
      propsData: {
        page: 1,
        total: 50,
        limit: 5
      }
    });

    expect(wrapper.vm.isPrevBtnDisabled).toEqual(true);
  });

  it('Кнопка следующей страницы недоступна, если текущая равна последней', () => {
    const wrapper = shallowMount(ContentPagination, {
      propsData: {
        page: 10,
        total: 50,
        limit: 5
      }
    });

    expect(wrapper.vm.isNextBtnDisabled).toEqual(true);
  });

  it('Кнопка предыдущей страницы доступна, если это возможно', () => {
    const wrapper = shallowMount(ContentPagination, {
      propsData: {
        page: 2,
        total: 50,
        limit: 5
      }
    });

    expect(wrapper.vm.isPrevBtnDisabled).toEqual(false);
  });

  it('Кнопка следующей страницы доступна, если это возможно', () => {
    const wrapper = shallowMount(ContentPagination, {
      propsData: {
        page: 9,
        total: 50,
        limit: 5
      }
    });

    expect(wrapper.vm.isNextBtnDisabled).toEqual(false);
  });

  it('Номер активной кнопки пагинатора равен текущей странице', () => {
    const wrapper = shallowMount(ContentPagination, {
      propsData: {
        page: 3,
        total: 50,
        limit: 5
      }
    });

    const activePageLink = wrapper.find('.active .page-link');

    expect(Number(activePageLink.text())).toBe(3);
  });
});
