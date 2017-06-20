import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import {
  openNewBoardModal,
  closeNewBoardModal,
  postBoardAsync,
  clearPostResult,
} from '../../actions/board/new'
import NewBoard from '../../components/board/new'

function mapStateToProps(state) {
  return state.new_board
}

function mapDispatchToProps(dispatch) {
  return {
    openNewBoardModal: () => {
      dispatch(openNewBoardModal())
    },
    closeNewBoardModal: () => {
      dispatch(closeNewBoardModal())
    },
    postBoard: (category_id, title,  name, content) => {
      dispatch(postBoardAsync(category_id, title,  name, content))
    },
    clearPostResult: () => {
      dispatch(clearPostResult())
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBoard))
