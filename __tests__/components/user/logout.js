import React from 'react'
import { mount, shallow} from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import Logout from '../../../src/js/components/user/logout'
import '../../../__mock__/localstrage'

function setup(toggle=false) {
  const props = {
    toggle: toggle,
    logout: jest.fn(),
  }

  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Logout {...props} />
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
  describe('Logout', () => {
    it("should render child content when authorized", () => {
      logout()
      const { wrapper, props } = setup()
      expect(wrapper.find('Redirect').length).toBe(1)
      expect(wrapper.find('Redirect').props().to).toEqual("/")
      expect(props.logout.mock.calls.length).toBe(0)
    })

    it("should redirect to login page when not authorized", () => {
      login()
      const { wrapper, props } = setup()
      expect(wrapper.find('p').text()).toEqual("ログアウト中です…")
      expect(wrapper.find('ProgressBar').length).toBe(1)
      expect(props.logout.mock.calls.length).toBe(1)
    })
  })
})
