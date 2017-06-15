import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const getPopularBoards =  (boards) => {
  return { type: type.GET_POPULAR_BOARDS, boards: boards }
}

export const getPopularBoardsAsync = (category_id) => {
  return dispatch => {
    return MatomeChannel.Board.all({
      per: 10,
      page: 1,
      category_id: category_id,
    }, dispatch).then( (resp) => {
      dispatch(getPopularBoards(resp.data.boards))
    }).catch( (error) => {
      console.error('getPopularBoardsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

const getPopularComments =  (comments) => {
  return { type: type.GET_POPULAR_COMMENTS, comments: comments }
}

export const getPopularCommentsAsync = (category_id) => {
  return dispatch => {
    return MatomeChannel.Comment.popular(category_id, dispatch).then( (resp) => {
      dispatch(getPopularComments(resp.data))
    }).catch( (error) => {
      console.error('getPopularCommentsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}
