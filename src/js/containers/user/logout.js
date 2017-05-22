import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { logoutAsync } from '../../actions/user/logout'
import Logout from '../../components/user/logout'


function mapStateToProps(state) {
  return state.logout
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logoutAsync())
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))
