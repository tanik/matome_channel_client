import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Message from '../../src/js/components/message'
import { StaticRouter } from 'react-router'
import '../../__mock__/localstrage'

function setup(notices=[], errors=[]) {
  const props = {
    notices: notices,
    errors: errors,
    setNotices: jest.fn(),
    setErrors: jest.fn(),
    clearMessages: jest.fn(),
  }
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Message {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Message', () => {
    it('should render when no message', () => {
      const { wrapper } = setup()
      const alertContainerProps = wrapper.find('AlertContainer').props()
      expect(alertContainerProps.offset).toBe(14)
      expect(alertContainerProps.position).toEqual('top left')
      expect(alertContainerProps.theme).toEqual('light')
      expect(alertContainerProps.time).toBe(5000)
      expect(alertContainerProps.transition).toEqual('scale')
    })

    it('should render when has any notices', () => {
      const { wrapper, props } = setup(['notice'])
      wrapper.update()
      expect(props.clearMessages.mock.calls.length).toBe(1)
    })

    it('should render when has any errors', () => {
      const { wrapper, props } = setup([], ['error'])
      wrapper.update()
      expect(props.clearMessages.mock.calls.length).toBe(1)
    })
  })
})
