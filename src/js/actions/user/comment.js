import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const getMyComments =  (comments, pagination) => {
  return {
    type: type.GET_MY_COMMENTS,
    comments: comments,
    pagination: pagination
  }
}

export const getMyCommentsAsync = (type, page, per)  => {
  return dispatch => {
    return MatomeChannel.User.myitem(type, {page, per}, dispatch).then( (resp) => {
      dispatch(getMyComments(resp.data.comments, resp.data.pagination))
    }).catch( (error) => {
      console.error('getMyCommentsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}
