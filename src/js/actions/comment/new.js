import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const postCommentSuccess = (response) => {
  return { type: type.POST_COMMENT_SUCCESS, response: response }
}

const postCommentFailure = (error) => {
  return { type: type.POST_COMMENT_FAILURE, error: error }
}

export const postCommentAsync = (board_id, name, content) => {
  return dispatch => {
    return MatomeChannel.Comment.create(board_id, name, content, dispatch).then( (resp) => {
      dispatch(postCommentSuccess(resp.data))
    }).catch( (error) => {
      console.error(error)
      let error_messages = ["エラーが発生しました。しばらくお待ちいただいてから再度リトライしてください。"]
      let error_attributes = {}
      if( error.response &&
          error.response.data ){
        error_attributes = error.response.data
        const field2name = {
          name: '名前',
          content: 'コメント',
        }
        error_messages = []
        Object.keys(error.response.data).forEach( (field) => {
          error.response.data[field].forEach( (error) => {
            error_messages.push(`${field2name[field]}${error}`)
          })
        })
      }
      dispatch(postCommentFailure(error_attributes))
      dispatch(setErrors(error_messages))
    })
  }
}

export const openNewCommentModal = (content) => {
  return { type: type.OPEN_NEW_COMMENT_MODAL, content: content }
}

export const closeNewCommentModal = () => {
  return { type: type.CLOSE_NEW_COMMENT_MODAL }
}
