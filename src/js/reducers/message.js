import * as action_type from '../constants/action_types'

const initialState = {
  notices: [],
  errors: [],
}

export default function message_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.SET_NOTICES: {
      return {
        notices: action.notices,
        errors: [],
      }
    }
    case action_type.SET_ERRORS: {
      return {
        notices: [],
        errors: action.errors,
      }
    }
    case action_type.CLEAR_MESSAGES: {
      return {
        notices: [],
        errors: [],
      }
    }
    default:
      return state
  }
}
