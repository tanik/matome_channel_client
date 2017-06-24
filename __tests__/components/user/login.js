import React from 'react'
import { mount, shallow} from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import Login from '../../../src/js/components/user/login'
import '../../../__mock__/localstrage'

const authed = {
  'access-token': 'aaaaaaaaa',
  'client': 'bbbbbbbbb',
  'uid': 'test@example.com',
  'expiry': 1497951304,
  'user_id': 1,
}
const not_authed = {
  'access-token': '',
  'client': '',
  'uid': '',
  'expiry': 0,
  'user_id': null,
}

function setup(response={}) {
  const props = {
    response: response,
    login: jest.fn(),
  }

  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Login {...props} />
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
  describe('Login', () => {
    it("should render child content when authorized", () => {
      login()
      const { wrapper, props } = setup()
      expect(wrapper.find('Redirect').length).toBe(1)
      expect(wrapper.find('Redirect').props().to).toEqual("/")
    })

    it("should redirect to login page when not authorized", () => {
      logout()
      const { wrapper, props } = setup()
      expect(wrapper.find('h2').text()).toEqual("ログイン")
    })

    describe('login', () => {
      it("should call login", () => {
        logout()
        const { wrapper, props } = setup()
        const instance = wrapper.find('Login').node
        instance.email = {
          value: 'test@example.com'
        }
        instance.password = {
          value: 'password'
        }
        instance.login({preventDefault: jest.fn()})
        expect(props.login.mock.calls[0]).toEqual(['test@example.com', 'password'])
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
        const instance = wrapper.find('Login').node
        expect(instance.isValid('email')).toEqual("error")
      })
      it("should return error if password has errors", () => {
        const response = {
          errors: {
            password: ['が不正です。'],
          }
        }
        const { wrapper, props } = setup(response)
        const instance = wrapper.find('Login').node
        expect(instance.isValid('password')).toEqual("error")
      })
    })
  })
})
