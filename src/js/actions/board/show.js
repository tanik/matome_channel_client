import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'

const getBoard =  (board) => {
  return { type: type.GET_BOARD, board: board }
}

export const getBoardAsync = (id) => {
  return dispatch => {
    return MatomeChannel.Board.find(id, {}, dispatch).then( (resp) => {
      dispatch(getBoard(resp.data))
    }).catch( (error) => {
      // TODO
      console.error(error)
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
      // TODO
      console.error(error)
    })
  }
}

export const setFavoriteCommentAsync = (board_id, comment_id) => {
  return dispatch => {
    return MatomeChannel.Comment.favorite(board_id, comment_id, dispatch).then( () => {
      // websocketで受け取るのでここでは描画しない
    }).catch( (error) => {
      // TODO
      console.error(error)
    })
  }
}

export const changeFavoriteBoard = (favorite) => {
  return { type: type.CHANGE_FAVORITE_BOARD, favorite: favorite }
}

export const changeFavoriteComment = (favorite) => {
  return { type: type.CHANGE_FAVORITE_COMMENT, favorite: favorite }
}

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
      dispatch(postCommentFailure(error))
    })
  }
}

export const addCommentImage = (comment_image) => {
  return { type: type.ADD_COMMENT_IMAGE, comment_image: comment_image }
}

export const addCommentWebsite = (comment_website) => {
  return { type: type.ADD_COMMENT_WEBSITE, comment_website: comment_website }
}
