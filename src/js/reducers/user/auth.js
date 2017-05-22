import * as action_type from '../../constants/action_types'

const initialState = {
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.SET_AUTH: {
      return action.auth
    }
    default:
      return state
  }
}
