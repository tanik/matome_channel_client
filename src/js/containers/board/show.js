import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import {
  getBoardAsync,
  addComment,
  setFavoriteBoardAsync,
  setFavoriteCommentAsync,
  changeFavoriteBoard,
  changeFavoriteComment,
  postCommentAsync,
  addCommentImage,
  addCommentWebsite
} from '../../actions/board/show'
import ShowBoard from '../../components/board/show'


function mapStateToProps(state) {
  return state.show_board
}

function mapDispatchToProps(dispatch) {
  return {
    getBoard: (id) => {
      dispatch(getBoardAsync(id))
    },
    addComment: (comment) => {
      dispatch(addComment(comment))
    },
    setFavoriteBoard: (board_id) => {
      dispatch(setFavoriteBoardAsync(board_id))
    },
    setFavoriteComment: (board_id, comment_id) => {
      dispatch(setFavoriteCommentAsync(board_id, comment_id))
    },
    changeFavoriteBoard: (favorite) => {
      dispatch(changeFavoriteBoard(favorite))
    },
    changeFavoriteComment: (favorite) => {
      dispatch(changeFavoriteComment(favorite))
    },
    postComment: (board_id, name, content) => {
      dispatch(postCommentAsync(board_id, name, content))
    },
    addCommentImage: (comment_image) => {
      dispatch(addCommentImage(comment_image))
    },
    addCommentWebsite: (comment_website) => {
      dispatch(addCommentWebsite(comment_website))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowBoard))
