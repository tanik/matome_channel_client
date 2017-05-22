import * as action_type from '../../constants/action_types'

const initialState = {
  board: {},
}

export default function board_show_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.GET_BOARD: {
      return {
        board: action.board
      }
    }
    case action_type.ADD_COMMENT: {
      let board = state.board
      let comments = board.comments.slice(0)
      comments.unshift(action.comment)
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          comments: comments,
        }
      }
    }
    default:
      return state
  }
}
