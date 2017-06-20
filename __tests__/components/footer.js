import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import Footer from '../../src/js/components/footer'
import { StaticRouter } from 'react-router'

function setup(posted=false, errors={}) {
  const props = {}
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Footer {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Footer', () => {
    it('should render self and subcomponents', () => {
      const { wrapper } = setup()
      expect(wrapper.find('li.breadcrumb-item Link').at(0).props().to).toEqual('/')
      expect(wrapper.find('li.breadcrumb-item Link').at(0).text()).toEqual('Home')
      expect(wrapper.find('li.breadcrumb-item Link').at(1).props().to).toEqual('/contact')
      expect(wrapper.find('li.breadcrumb-item Link').at(1).text()).toEqual('問い合わせ')
      expect(wrapper.find('li.breadcrumb-item Link').at(2).props().to).toEqual('/about')
      expect(wrapper.find('li.breadcrumb-item Link').at(2).text()).toEqual('まとめちゃんねるについて')
      expect(wrapper.find('li.breadcrumb-item a').at(3).props().href).toEqual('https://github.com/tanik')
      expect(wrapper.find('li.breadcrumb-item a').at(3).text()).toEqual('github')
    })
  })
})
