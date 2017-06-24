import React from 'react'
import { mount, shallow} from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import Auth from '../../../src/js/components/user/auth'
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

function setup(auth={}) {
  const props = auth
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Auth {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Auth', () => {
    it("should render child content when authorized", () => {
      const { wrapper, props } = setup(authed)
      expect(wrapper.find('Route').length).toBe(1)
    })

    it("should redirect to login page when not authorized", () => {
      const { wrapper, props } = setup(not_authed)
      expect(wrapper.find('Redirect').length).toBe(1)
      expect(wrapper.find('Redirect').props().to).toBe('/login')
    })
  })
})
