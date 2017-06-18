import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

export const openCommentModal = () => {
  return { type: type.OPEN_COMMENT_MODAL }
}
export const closeCommentModal = () => {
  return { type: type.CLOSE_COMMENT_MODAL }
}
export const changeModalComments = (comment, related_comments=[]) => {
  return { type: type.CHANGE_MODAL_COMMENTS, comment: comment, related_comments: related_comments }
}

export const getCommentsByNumAsync = (board_id, num) => {
  return dispatch => {
    return MatomeChannel.Comment.get_by_num(board_id, num, dispatch).then( (resp) => {
      dispatch(changeModalComments(resp.data.comment, resp.data.related_comments))
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

export const getRelatedCommentsAsync = (comment) => {
  return dispatch => {
    return MatomeChannel.Comment.find(comment.board_id, comment.id, {}, dispatch).then( (resp) => {
      dispatch(changeModalComments(resp.data.comment, resp.data.related_comments))
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

export const changeFavoriteCommentOnModal = (favorite) => {
  return { type: type.CHANGE_FAVORITE_COMMENT_ON_MODAL, favorite: favorite }
}
