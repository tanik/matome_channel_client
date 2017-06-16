import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const getMypageInfomations =  (data) => {
  return { type: type.GET_MYPAGE_INFO, data: data }
}

const setMypageLoading = (loading) => {
  return { type: type.SET_MYPAGE_LOADING, loading: loading }
}

export const getMypageInfomationsAsync = () => {
  return dispatch => {
    dispatch(setMypageLoading(true))
    return MatomeChannel.User.mypage(dispatch).then( (resp) => {
      dispatch(setMypageLoading(false))
      dispatch(getMypageInfomations(resp.data))
    }).catch( (error) => {
      dispatch(setMypageLoading(false))
      console.error('getMypageInfomationsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

const getMoreComments = (comments) => {
  return { type: type.GET_MORE_COMMENTS_ON_TL, comments: comments }
}

export const getMoreCommentsAsync = (lt_id) => {
  return dispatch => {
    return MatomeChannel.User.my_comments({lt_id}, dispatch).then( (resp) => {
      dispatch(getMoreComments(resp.data))
    }).catch( (error) => {
      console.error('getMypageInfomationsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

export const addCommentOnTimeline = (comment) => {
  return { type: type.ADD_COMMENT_ON_TL, comment: comment }
}

export const addCommentImageOnTimeline = (comment_image) => {
  return { type: type.ADD_COMMENT_IMAGE_ON_TL, comment_image: comment_image }
}

export const addCommentWebsiteOnTimeline = (comment_website) => {
  return { type: type.ADD_COMMENT_WEBSITE_ON_TL, comment_website: comment_website }
}

export const changeFavoriteCommentOnTimeline = (favorite) => {
  return { type: type.CHANGE_FAVORITE_COMMENT_ON_TL, favorite: favorite }
}
