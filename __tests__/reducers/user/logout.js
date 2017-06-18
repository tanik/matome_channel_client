import reducer from '../../../src/js/reducers/user/logout'
import * as types from '../../../src/js/constants/action_types'

describe('user logout reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      logouted: false,
    })
  })

  it('should handle LOGOUT_SUCCESS', () => {
    const prevState = {
      logouted: false,
    }
    expect(
      reducer(prevState, {type: types.LOGOUT_SUCCESS})
    ).toEqual({
      logouted: true,
    })
  })

  it('should handle LOGIN_FAILURE', () => {
    const prevState = {
      logouted: false,
    }
    expect(
      reducer(prevState, {type: types.LOGOUT_FAILURE})
    ).toEqual({
      logouted: false,
    })
  })
})
