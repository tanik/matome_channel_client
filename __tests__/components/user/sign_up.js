import React from 'react'
import { mount, shallow} from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import SignUp from '../../../src/js/components/user/sign_up'
import '../../../__mock__/localstrage'

function setup(response={}) {
  const props = {
    response: response,
    signUp: jest.fn(),
  }

  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <SignUp {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

function login(){
  window.localStorage.setItem('auth', JSON.stringify({
    auth: {
      'access-token': 'aaaaaaaaa',
      'client': 'bbbbbbbbb',
      'uid': 'test@example.com',
      'expiry': 1497951304,
      'user_id': 1,
    }
  }))
}

function logout(){
  window.localStorage.setItem('auth', JSON.stringify({
    auth: {
      'access-token': '',
      'client': '',
      'uid': '',
      'expiry': 0,
      'user_id': null,
    }
  }))
}

describe('components', () => {
  describe('SignUp', () => {
    it("should render child content when authorized", () => {
      login()
      const { wrapper, props } = setup()
      expect(wrapper.find('Redirect').length).toBe(1)
      expect(wrapper.find('Redirect').props().to).toEqual("/")
    })

    it("should redirect to login page when not authorized", () => {
      logout()
      const { wrapper, props } = setup()
      expect(wrapper.find('h2').text()).toEqual("ユーザ登録")
    })

    describe('sign_up', () => {
      it("should call sign_up", () => {
        logout()
        const { wrapper, props } = setup()
        const instance = wrapper.find('SignUp').node
        instance.email = {
          value: 'test@example.com'
        }
        instance.password = {
          value: 'password'
        }
        instance.password_confirmation = {
          value: 'password'
        }
        instance.signUp({preventDefault: jest.fn()})
        expect(props.signUp.mock.calls[0]).toEqual(['test@example.com', 'password', 'password'])
      })
    })

    describe('isValid', () => {
      it("should return error if email has errors", () => {
        const response = {
          errors: {
            email: ['が不正です。'],
          }
        }
        const { wrapper, props } = setup(response)
        const instance = wrapper.find('SignUp').node
        expect(instance.isValid('email')).toEqual("error")
      })
      it("should return error if password has errors", () => {
        const response = {
          errors: {
            password: ['が不正です。'],
          }
        }
        const { wrapper, props } = setup(response)
        const instance = wrapper.find('SignUp').node
        expect(instance.isValid('password')).toEqual("error")
      })
      it("should return error if password_confirmation has errors", () => {
        const response = {
          errors: {
            password_confirmation: ['が不正です。'],
          }
        }
        const { wrapper, props } = setup(response)
        const instance = wrapper.find('SignUp').node
        expect(instance.isValid('password_confirmation')).toEqual("error")
      })
    })
  })
})
