import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const getMyBoards =  (boards, pagination) => {
  return {
    type: type.GET_MY_BOARDS,
    boards: boards,
    pagination: pagination
  }
}

export const getMyBoardsAsync = (type, page, per)  => {
  return dispatch => {
    return MatomeChannel.User.myitem(type, {page, per}, dispatch).then( (resp) => {
      dispatch(getMyBoards(resp.data.boards, resp.data.pagination))
    }).catch( (error) => {
      console.error('getMyBoardsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}
