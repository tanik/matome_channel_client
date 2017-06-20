import * as action_type from '../../constants/action_types'

const initialState = {
  toggle: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.LOGOUT_SUCCESS: {
      return {
        toggle: !state.toggle,
      }
    }
    case action_type.LOGOUT_FAILURE: {
      return {
        toggle: state.toggle,
      }
    }
    default:
      return state
  }
}
