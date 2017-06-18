import reducer from '../../src/js/reducers/message'
import * as types from '../../src/js/constants/action_types'

describe('message reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      notices: [],
      errors: [],
    })
  })

  it('should handle SET_NOTICES', () => {
    const prevState = {
      notices: [],
      errors: [],
    }
    const notices = ['notice message']
    expect(
      reducer(prevState, {type: types.SET_NOTICES, notices})
    ).toEqual({
      notices,
      errors: [],
    })
  })

  it('should handle SET_ERRORS', () => {
    const prevState = {
      notices: [],
      errors: [],
    }
    const errors = ['error message']
    expect(
      reducer(prevState, {type: types.SET_ERRORS, errors})
    ).toEqual({
      notices: [],
      errors,
    })
  })

  it('should handle CLEAR_MESSAGES', () => {
    const prevState = {
      notices: ['notice message'],
      errors: ['error message'],
    }
    const errors = ['error message']
    expect(
      reducer(prevState, {type: types.CLEAR_MESSAGES})
    ).toEqual({
      notices: [],
      errors: [],
    })
  })
})
