import * as action_type from '../../constants/action_types'

const initialState = {
  show: false,
  content: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.OPEN_NEW_COMMENT_MODAL: {
      return({
        show: true,
        content: action.content,
      })
    }
    case action_type.CLOSE_NEW_COMMENT_MODAL: {
      return({
        show: false,
        content: '',
      })
    }
    case action_type.POST_COMMENT_SUCCESS: {
      return({
        show: false,
        content: action.response.content,
      })
    }
    case action_type.POST_COMMENT_FAILURE: {
      return({
        show: state.show,
        content: state.content,
      })
    }
    default: {
      return state
    }
  }
}
