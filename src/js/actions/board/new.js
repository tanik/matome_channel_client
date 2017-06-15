import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

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
      dispatch(setErrors(['エラーなのだ・・・']))
      dispatch(postBoardFailure(error))
    })
  }
}

export const setNewBoardCategories = (categories) => {
  return { type: type.SET_NEW_BOARD_CATEGORIES, categories: categories }
}

export const openNewBoardModal = () => {
  return { type: type.OPEN_NEW_BOARD_MODAL }
}

export const closeNewBoardModal = () => {
  return { type: type.CLOSE_NEW_BOARD_MODAL }
}
