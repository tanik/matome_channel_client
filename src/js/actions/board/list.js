import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'

const getBoards =  (page, per, category_id, boards) => {
  return { type: type.GET_BOARD_LIST, page: page, per: per, category_id: category_id, boards: boards }
}

export const getBoardsAsync = (page, per, category_id)  => {
  return dispatch => {
    let params = {page: page, per: per}
    if(category_id > 0) params.category_id = category_id
    return MatomeChannel.Board.all(params).then( (resp) => {
      dispatch(getBoards(page, per, category_id, resp.data))
    })
  }
}

