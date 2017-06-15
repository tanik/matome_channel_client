import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { getPopularBoardsAsync, getPopularCommentsAsync } from '../../actions/home/guest'
import GuestHome from '../../components/home/guest'

function mapStateToProps(state) {
  return state.guest_home
}

function mapDispatchToProps(dispatch) {
  return {
    getPopularBoards: (category_id) => {
      dispatch(getPopularBoardsAsync(category_id))
    },
    getPopularComments: (category_id) => {
      dispatch(getPopularCommentsAsync(category_id))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GuestHome))
