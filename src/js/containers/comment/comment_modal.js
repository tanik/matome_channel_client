import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import {
  openCommentModal,
  closeCommentModal,
  changeModalComments,
  getCommentsByNumAsync,
  getRelatedCommentsAsync,
} from '../../actions/comment/comment_modal'
import CommentModal from '../../components/comment/comment_modal'


function mapStateToProps(state) {
  return state.comment_modal
}

function mapDispatchToProps(dispatch) {
  return {
    open: () => {
      dispatch(openCommentModal())
    },
    close: () => {
      dispatch(closeCommentModal())
    },
    changeComments: (comment, related_comments=[]) => {
      dispatch(changeModalComments(comment, related_comments))
    },
    getCommentsByNumAsync: (num) => {
      dispatch(getCommentsByNumAsync(num))
    },
    getRelatedCommentsAsync: (comment) => {
      dispatch(getRelatedCommentsAsync(comment))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentModal))
