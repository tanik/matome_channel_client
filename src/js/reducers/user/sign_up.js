import * as action_type from '../../constants/action_types'

const initialState = {
  response: {},
}

export default function sign_up_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.SIGN_UP_SUCCESS: {
      return {
        response: action.response,
      }
    }
    case action_type.SIGN_UP_FAILURE: {
      return {
        response: action.response,
      }
    }
    default:
      return state
  }
}
