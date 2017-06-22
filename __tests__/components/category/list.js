import React from 'react'
import { mount, shallow} from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import sinon from 'sinon';
import CategoryList from '../../../src/js/components/category/list'
import '../../../__mock__/localstrage'
import { Breadcrumb } from 'react-bootstrap';

const categories = [{
  id: 1,
  parent_id: null,
  name: 'Root cat1',
},{
  id: 2,
  parent_id: 1,
  name: 'Child cat1',
},{
  id: 3,
  parent_id: null,
  name: 'Root cat2',
},{
  id: 4,
  parent_id: 3,
  name: 'Child cat2',
}]

function setup(url_suffix='',categories=[],selected_category_id=undefined) {
  const props = {
    match: {
      params: {
        id: selected_category_id,
      },
      url: `/categories/${selected_category_id}${url_suffix}`,
    },
    location: {
      pathname: `/categories/${selected_category_id}${url_suffix}`,
    },
    url_suffix: url_suffix,
    categories: categories,
    getCategories: jest.fn(),
    changeCategory: jest.fn(),
  }
  const context = {}
  const store = require("../../../src/js/stores/store_dev").store
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <CategoryList {...props} />
      </BrowserRouter>
    </Provider>
  )

  return {
    props,
    wrapper
  }
}


describe('components', () => {
  describe('CategoryList', () => {
    it('should render category list when category is not selected', () => {
      const { wrapper, props } = setup('', categories)
      expect(wrapper.find('Link').text()).toEqual('カテゴリ')
      expect(wrapper.find('Link').props().to).toEqual('')
    })

    it('should render category list when root category is selected', () => {
      const { wrapper, props } = setup('', categories, 1)
      expect(wrapper.find('.category-root').find('IndexLinkContainer').at(0).props().to).toEqual('/categories/1')
      expect(wrapper.find('.category-root').find('NavItem').at(0).text()).toEqual('Root cat1')
      expect(wrapper.find('.category-root').find('IndexLinkContainer').at(1).props().to).toEqual('/categories/3')
      expect(wrapper.find('.category-root').find('NavItem').at(1).text()).toEqual('Root cat2')
      expect(wrapper.find('.category-child').find('IndexLinkContainer').props().to).toEqual('/categories/2')
      expect(wrapper.find('.category-child').find(Breadcrumb.Item).text()).toEqual('Child cat1')
    })

    it('should render category list when child category is selected', () => {
      const { wrapper, props } = setup('', categories, 2)
      expect(wrapper.find('.category-root').find('IndexLinkContainer').at(0).props().to).toEqual('/categories/1')
      expect(wrapper.find('.category-root').find('NavItem').at(0).text()).toEqual('Root cat1')
      expect(wrapper.find('.category-root').find('IndexLinkContainer').at(1).props().to).toEqual('/categories/3')
      expect(wrapper.find('.category-root').find('NavItem').at(1).text()).toEqual('Root cat2')
      expect(wrapper.find('.category-child').find(Breadcrumb.Item).text()).toEqual('Child cat1')
    })

    describe('componentDidUpdate', () => {
      it('should call changeCategory when url changed', () => {
        const { wrapper, props } = setup('', categories, 2)
        const prevProps = {
          match: {
            params: {
              id: 1,
            },
            url: `/categories/1`,
          },
          location: {
            pathname: `/categories/1`,
          },
          url_suffix: '',
          categories: categories,
          getCategories: jest.fn(),
          changeCategory: jest.fn(),
        }
        wrapper.find('CategoryList').node.componentDidUpdate(prevProps)
        expect(props.changeCategory.mock.calls[0]).toEqual([2])
      })
    })
  })
})
