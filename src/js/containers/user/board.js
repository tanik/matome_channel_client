import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { getMyBoardsAsync } from '../../actions/user/board'
import MyBoards from '../../components/user/board'

function mapStateToProps(state) {
  return state.my_boards
}

function mapDispatchToProps(dispatch) {
  return {
    getMyBoards: (type, page, per) => {
      dispatch(getMyBoardsAsync(type, page, per))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyBoards))
