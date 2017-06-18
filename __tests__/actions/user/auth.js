import * as actions from '../../../src/js/actions/user/auth'
import * as types from '../../../src/js/constants/action_types'

describe('actions', () => {
  it('should create an action to set auth', () => {
    const auth = {}
    const expectedActions = {
      type: types.SET_AUTH,
      auth,
    }
    expect(actions.setAuth(auth)).toEqual(expectedActions)
  })
})
