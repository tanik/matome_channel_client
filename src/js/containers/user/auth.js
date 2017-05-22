import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { loginAsync } from '../../actions/user/auth'
import Auth from '../../components/user/auth'


function mapStateToProps(state) {
  return state.auth
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))
