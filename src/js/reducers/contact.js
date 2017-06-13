import * as action_type from '../constants/action_types'

const initialState = {
  posted: false,
  errors: {},
}

export default function message_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.POST_CONTACT_SUCCESS: {
      return {
        posted: true,
        errors: {},
      }
    }
    case action_type.SET_CONTACT_ERRORS: {
      return {
        posted: false,
        errors: action.errors,
      }
    }
    default:
      return state
  }
}
