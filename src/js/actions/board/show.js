import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const getBoard =  (board) => {
  return { type: type.GET_BOARD, board: board }
}

export const getBoardAsync = (id) => {
  return dispatch => {
    return MatomeChannel.Board.find(id, {}, dispatch).then( (resp) => {
      dispatch(getBoard(resp.data))
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

export const addComment = (comment) => {
  return { type: type.ADD_COMMENT, comment: comment }
}

export const setFavoriteBoardAsync = (board_id) => {
  return dispatch => {
    return MatomeChannel.Board.favorite(board_id, dispatch).then( () => {
      // websocketで受け取るのでここでは描画しない
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

export const setFavoriteCommentAsync = (board_id, comment_id) => {
  return dispatch => {
    return MatomeChannel.Comment.favorite(board_id, comment_id, dispatch).then( () => {
      // websocketで受け取るのでここでは描画しない
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

export const changeFavoriteBoard = (favorite) => {
  return { type: type.CHANGE_FAVORITE_BOARD, favorite: favorite }
}

export const changeFavoriteComment = (favorite) => {
  return { type: type.CHANGE_FAVORITE_COMMENT, favorite: favorite }
}
export const addBoardImage = (board_image) => {
  return { type: type.ADD_BOARD_IMAGE, board_image: board_image }
}

export const addBoardWebsite = (board_website) => {
  return { type: type.ADD_BOARD_WEBSITE, board_website: board_website }
}

export const addCommentImage = (comment_image) => {
  return { type: type.ADD_COMMENT_IMAGE, comment_image: comment_image }
}

export const addCommentWebsite = (comment_website) => {
  return { type: type.ADD_COMMENT_WEBSITE, comment_website: comment_website }
}

const getCommentsSuccess = (comments) => {
  return { type: type.GET_COMMENTS_SUCCESS, comments: comments }
}

export const getCommentsAsync = (board_id, gt_id, lt_id) => {
  return dispatch => {
    return MatomeChannel.Comment.all(board_id, gt_id, lt_id, dispatch).then( (resp) => {
      dispatch(getCommentsSuccess(resp.data))
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

const getWebsitesSuccess = (websites) => {
  return { type: type.GET_WEBSITES_SUCCESS, websites: websites }
}

export const getWebsitesAsync = (board_id, gt_id, lt_id) => {
  return dispatch => {
    return MatomeChannel.Board.websites(board_id, gt_id, lt_id, dispatch).then( (resp) => {
      dispatch(getWebsitesSuccess(resp.data))
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}

const getImagesSuccess = (images) => {
  return { type: type.GET_IMAGES_SUCCESS, images: images }
}

export const getImagesAsync = (board_id, gt_id, lt_id) => {
  return dispatch => {
    return MatomeChannel.Board.images(board_id, gt_id, lt_id, dispatch).then( (resp) => {
      dispatch(getImagesSuccess(resp.data))
    }).catch( (error) => {
      console.error(error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}
