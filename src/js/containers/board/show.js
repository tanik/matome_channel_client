import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { getBoardAsync, addComment } from '../../actions/board/show'
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
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowBoard))
