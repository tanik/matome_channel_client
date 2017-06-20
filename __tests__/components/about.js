import React from 'react'
import { mount } from 'enzyme'
import About from '../../src/js/components/about'
import { StaticRouter } from 'react-router'

function setup(posted=false, errors={}) {
  const props = {}
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <About {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('About', () => {
    it('should render self and subcomponents', () => {
      const { wrapper } = setup()
      expect(wrapper.find('.about').length).toBe(1)
    })
  })
})
