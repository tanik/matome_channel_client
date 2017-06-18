import reducer from '../../../src/js/reducers/user/sign_up'
import * as types from '../../../src/js/constants/action_types'

describe('user login reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      response: {}
    })
  })
  it('should handle SIGN_UP_SUCCESS', () => {
    const prevState = {
      response: {}
    }
    const response = {
      id: 1,
      email: 'user@example.com',
    }
    expect(
      reducer(prevState, {type: types.SIGN_UP_SUCCESS, response})
    ).toEqual({
      response,
    })
  })

  it('should handle SIGN_UP_FAILURE', () => {
    const prevState = {
      response: {}
    }
    const response = {
      errros: '認証情報が正しくありません。',
    }
    expect(
      reducer(prevState, {type: types.SIGN_UP_FAILURE, response})
    ).toEqual({
      response,
    })
  })
})
