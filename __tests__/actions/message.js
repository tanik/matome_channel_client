import * as actions from '../../src/js/actions/message'
import * as types from '../../src/js/constants/action_types'


describe('actions', () => {
  it('should create an action to set notices', () => {
    const notices = [
      'Message',
    ]
    const expectedAction = {
      type: types.SET_NOTICES,
      notices
    }
    expect(actions.setNotices(notices)).toEqual(expectedAction)
  })

  it('should create an action to set errors', () => {
    const errors = [
      'Error Message',
    ]
    const expectedAction = {
      type: types.SET_ERRORS,
      errors
    }
    expect(actions.setErrors(errors)).toEqual(expectedAction)
  })

  it('should create an action to clear message', () => {
    const expectedAction = {
      type: types.CLEAR_MESSAGES,
    }
    expect(actions.clearMessages()).toEqual(expectedAction)
  })
})
