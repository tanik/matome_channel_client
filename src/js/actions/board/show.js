import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'

const getBoard =  (board) => {
  return { type: type.GET_BOARD, board: board }
}

export const getBoardAsync = (id) => {
  return dispatch => {
    return MatomeChannel.Board.find(id).then( (resp) => {
      dispatch(getBoard(resp.data))
    })
  }
}

export const addComment = (comment) => {
  return { type: type.ADD_COMMENT, comment: comment }
}
