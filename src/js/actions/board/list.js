import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'

const getBoards =  (page, per, category_id, boards) => {
  return { type: type.GET_BOARDS, page: page, per: per, category_id: category_id, boards: boards }
}

export const getBoardsAsync = (page, per, category_id)  => {
  return dispatch => {
    let params = {page: page, per: per}
    if(category_id > 0) params.category_id = category_id
    return MatomeChannel.Board.all(params, dispatch).then( (resp) => {
      dispatch(getBoards(page, per, category_id, resp.data))
    }).catch( () => {
      // TODO
    })
  }
}

const getCategories =  (categories) => {
  return { type: type.GET_CATEGORIES, categories: categories }
}

export const changeCategory =  (category_id) => {
  return { type: type.CHANGE_CATEGORY, category_id: category_id }
}

export const getCategoriesAsync = () => {
  return dispatch => {
    return MatomeChannel.Category.all({}, dispatch).then( (resp) => {
      dispatch(getCategories(resp.data))
    }).catch( () => {
      // TODO
    })
  }
}

const postBoardSuccess =  (response) => {
  return { type: type.POST_BOARD_SUCCESS, response: response }
}

const postBoardFailure =  (error) => {
  return { type: type.POST_BOARD_FAILURE, error: error }
}
export const postBoardAsync = (category_id, title,  name, content) => {
  return dispatch => {
    return MatomeChannel.Board.create(category_id, title,  name, content, dispatch).then( (resp) => {
      dispatch(postBoardSuccess(resp.data))
      // なんかうまく画面遷移してくれない・・なぜなの・・
      //dispatch(push(`/boards/${resp.data.id}`))
    }).catch( (error) => {
      dispatch(postBoardFailure(error))
    })
  }
}
