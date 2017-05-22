import * as action_type from '../../constants/action_types'

const initialState = {
  logouted: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.LOGOUT_SUCCESS: {
      return {
        logouted: true,
      }
    }
    case action_type.LOGOUT_FAILURE: {
      return {
        logouted: false,
      }
    }
    default:
      return state
  }
}

