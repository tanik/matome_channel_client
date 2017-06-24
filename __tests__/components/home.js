import React from 'react'
import { mount, shallow } from 'enzyme'
import { Modal } from 'react-bootstrap';
import Home from '../../src/js/components/home'
import '../../__mock__/localstrage'

function setup(board_id=1,content='',show=false) {
  const props = {
  }
  const wrapper = shallow(
    <Home {...props} />
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Home', () => {
    it("should render GuestHome when sign in", () => {
      window.localStorage.setItem('auth', JSON.stringify({
        auth: {
          'access-token': 'aaaaaaaaa',
          'client': 'bbbbbbbbb',
          'uid': 'test@example.com',
          'expiry': 1497951304,
          'user_id': 1,
        }
      }))
      const { wrapper, props } = setup()
    })
    it("should render GuestHome when not sign in", () => {
      window.localStorage.setItem('auth', JSON.stringify({
        auth: {}
      }))
      const { wrapper, props } = setup()
    })
  })
})
