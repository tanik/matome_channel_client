import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import NewComment from '../../components/comment/new'

import {
  openNewCommentModal,
  closeNewCommentModal,
  postCommentAsync,
} from '../../actions/comment/new'

function mapStateToProps(state) {
  return state.new_comment
}

function mapDispatchToProps(dispatch) {
  return {
    openNewCommentModal: (content) => {
      dispatch(openNewCommentModal(content))
    },
    closeNewCommentModal: () => {
      dispatch(closeNewCommentModal())
    },
    postComment: (board_id, name, content) => {
      dispatch(postCommentAsync(board_id, name, content))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment))
