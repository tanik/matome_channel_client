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
  addBoardImage,
  addBoardWebsite,
  addCommentImage,
  addCommentWebsite,
  getCommentsAsync,
} from '../../actions/board/show'

import {
  changeModalComments,
  getRelatedCommentsAsync,
  getCommentsByNumAsync,
  openCommentModal,
  changeFavoriteCommentOnModal,
} from '../../actions/comment/comment_modal'
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
      dispatch(changeFavoriteCommentOnModal(favorite))
      dispatch(changeFavoriteComment(favorite))
    },
    postComment: (board_id, name, content) => {
      dispatch(postCommentAsync(board_id, name, content))
    },
    addBoardImage: (board_image) => {
      dispatch(addBoardImage(board_image))
    },
    addBoardWebsite: (board_website) => {
      dispatch(addBoardWebsite(board_website))
    },
    addCommentImage: (comment_image) => {
      dispatch(addCommentImage(comment_image))
    },
    addCommentWebsite: (comment_website) => {
      dispatch(addCommentWebsite(comment_website))
    },
    getComments: (board_id, gt_id, lt_id) => {
      dispatch(getCommentsAsync(board_id, gt_id, lt_id))
    },
    showCommentModal: (data) => {
      dispatch(changeModalComments({}, []))
      if(data.comment){
        dispatch(getRelatedCommentsAsync(data.comment))
      }else{
        dispatch(getCommentsByNumAsync(data.board_id, data.num))
      }
      dispatch(openCommentModal())
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowBoard))
