import reducer from '../../../src/js/reducers/user/login'
import * as types from '../../../src/js/constants/action_types'

describe('user sign up reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      response: {}
    })
  })
  it('should handle LOGIN_SUCCESS', () => {
    const prevState = {
      response: {}
    }
    const response = {
      id: 1,
      email: 'user@example.com',
    }
    expect(
      reducer(prevState, {type: types.LOGIN_SUCCESS, response})
    ).toEqual({
      response,
    })
  })

  it('should handle LOGIN_FAILURE', () => {
    const prevState = {
      response: {}
    }
    const response = {
      errros: '認証情報が正しくありません。',
    }
    expect(
      reducer(prevState, {type: types.LOGIN_FAILURE, response})
    ).toEqual({
      response,
    })
  })
})
