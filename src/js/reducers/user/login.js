import * as action_type from '../../constants/action_types'

const initialState = {
  response: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.LOGIN_SUCCESS: {
      return {
        response: action.response,
      }
    }
    case action_type.LOGIN_FAILURE: {
      return {
        response: action.response,
      }
    }
    default:
      return state
  }
}
