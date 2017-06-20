import reducer from '../../../src/js/reducers/user/logout'
import * as types from '../../../src/js/constants/action_types'

describe('user logout reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      toggle: false,
    })
  })

  it('should handle LOGOUT_SUCCESS when before toggle is false', () => {
    const prevState = {
      toggle: false,
    }
    expect(
      reducer(prevState, {type: types.LOGOUT_SUCCESS})
    ).toEqual({
      toggle: true,
    })
  })
  it('should handle LOGOUT_SUCCESS when before toggle is true', () => {
    const prevState = {
      toggle: true,
    }
    expect(
      reducer(prevState, {type: types.LOGOUT_SUCCESS})
    ).toEqual({
      toggle: false,
    })
  })

  it('should handle LOGIN_FAILURE', () => {
    const prevState = {
      toggle: false,
    }
    expect(
      reducer(prevState, {type: types.LOGOUT_FAILURE})
    ).toEqual({
      toggle: false,
    })
  })
})
