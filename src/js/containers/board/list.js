import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { getBoardsAsync } from '../../actions/board/list'
import { openNewBoardModal } from '../../actions/board/new'
import BoardList from '../../components/board/list'

function mapStateToProps(state) {
  return state.board_list
}

function mapDispatchToProps(dispatch) {
  return {
    getBoards: (page, per, category_id, query) => {
      dispatch(getBoardsAsync(page, per, category_id, query))
    },
    openNewBoardModal: () => {
      dispatch(openNewBoardModal())
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardList))
