import reducer from '../../src/js/reducers/contact'
import * as types from '../../src/js/constants/action_types'

describe('contact reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      posted: false,
      errors: {},
    })
  })

  it('should handle POST_CONTACT_SUCCESS', () => {
    const prevState = {
      posted: false,
      errors: {},
    }
    expect(
      reducer(prevState, {type: types.POST_CONTACT_SUCCESS})
    ).toEqual({
      posted: true,
      errors: {},
    })
  })

  it('should handle SET_CONTACT_ERRORS', () => {
    const prevState = {
      posted: false,
      errors: {},
    }
    const errors = {
      email: 'はメールアドレスではありません。',
      content: 'は1文字以上入力してください。',
    }
    expect(
      reducer(prevState, {type: types.SET_CONTACT_ERRORS, errors})
    ).toEqual({
      posted: false,
      errors,
    })
  })
})
