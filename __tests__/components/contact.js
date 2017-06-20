import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import Contact from '../../src/js/components/contact'
import { StaticRouter } from 'react-router'

function setup(posted=false, errors={}) {
  const props = {
    posted: posted,
    errors: errors,
    setContactErrors: jest.fn(),
    postContact: jest.fn(),
  }
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Contact {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Contact', () => {
    it('should render self and subcomponents', () => {
      const { wrapper } = setup()
      expect(wrapper.find('h3').text()).toBe('お問い合わせ')
      expect(wrapper.find('FormGroup').length).toBe(3)
      expect(wrapper.find('Col').at(0).text()).toEqual('メールアドレス')
      expect(wrapper.find('Col').at(2).text()).toEqual('お問い合わせ内容')
      expect(wrapper.find('FormControl').at(0).props().type).toEqual('email')
      expect(wrapper.find('FormControl').at(1).props().rows).toEqual('10')
    })

    it('should post contact', () => {
      const { wrapper, props } = setup()
      const email = 'test@example.com'
      const content = 'test content'
      wrapper.find('input').at(0).node.value = email
      wrapper.find('textarea').at(0).node.value = content
      expect(props.postContact.mock.calls.length).toBe(0)
      wrapper.find('form').simulate('submit')
      expect(props.postContact.mock.calls.length).toBe(1)
    })

    it('should render error when input values are empty', () => {
      const { wrapper, props } = setup()
      expect(props.setContactErrors.mock.calls.length).toBe(0)
      wrapper.find('form').simulate('submit')
      expect(props.setContactErrors.mock.calls.length).toBe(1)
      expect(props.setContactErrors.mock.calls[0][0]).toEqual({
        email: ['を入力してください'],
        content: ['を入力してください'],
        full_messages: [],
      })
    })

    it('should render error when props has errors', () => {
      const errors = {
        email: ['を入力してください'],
        content: ['を入力してください'],
      }
      const { wrapper } = setup(false, errors)
      expect(wrapper.find('FormGroup').at(0).props().validationState).toEqual("error")
      expect(wrapper.find('FormGroup').at(1).props().validationState).toEqual("error")
    })

    it('should redirect after post succeed', () => {
      const { wrapper } = setup(true)
      expect(wrapper.find('Redirect').props().to).toBe('/')
    })
  })
})
