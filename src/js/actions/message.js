import * as type from '../constants/action_types'

export const setNotices = (notices) => {
  return { type: type.SET_NOTICES, notices: notices }
}

export const setErrors = (errors) => {
  return { type: type.SET_ERRORS, errors: errors }
}

export const clearMessage = () => {
  return { type: type.CLEAR_MESSAGES }
}
