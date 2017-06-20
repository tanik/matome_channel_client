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
    }).catch( (error) => {
      let error_messages = ["エラーが発生しました。しばらくお待ちいただいてから再度リトライしてください。"]
      let error_attributes = {}
      if( error.response &&
          error.response.data ){
        error_attributes = error.response.data
        const field2name = {
          title: 'タイトル',
          category_id: 'カテゴリ',
          "comments.name": '名前',
          "comments.content": 'コメント',
        }
        error_messages = []
        Object.keys(error.response.data).forEach( (field) => {
          error.response.data[field].forEach( (error) => {
            error_messages.push(`${field2name[field]}${error}`)
          })
        })
      }
      dispatch(setErrors(error_messages))
      dispatch(postBoardFailure(error_attributes))
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

export const clearPostResult = () => {
  return { type: type.CLEAR_POST_RESULT }
}
