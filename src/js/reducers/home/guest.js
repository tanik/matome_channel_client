import * as action_type from '../../constants/action_types'

const initialState = {
  boards: [],
  comments: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.GET_POPULAR_BOARDS: {
      return {
        boards: action.boards,
        comments: state.comments,
      }
    }
    case action_type.GET_POPULAR_COMMENTS: {
      return {
        boards: state.boards,
        comments: action.comments,
      }
    }
    default:
      return state
  }
}
