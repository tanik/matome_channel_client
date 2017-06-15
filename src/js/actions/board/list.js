import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const getBoards =  (category_id, boards, pagination) => {
  return {
    type: type.GET_BOARDS,
    category_id: category_id,
    boards: boards,
    pagination: pagination
  }
}

export const getBoardsAsync = (page, per, category_id, query)  => {
  return dispatch => {
    let params = {page: page, per: per}
    if(query){
      params['q'] = query
    }
    if(category_id > 0) params.category_id = category_id
    return MatomeChannel.Board.all(params, dispatch).then( (resp) => {
      dispatch(getBoards(category_id, resp.data.boards, resp.data.pagination))
    }).catch( (error) => {
      console.error('getBoardsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}
