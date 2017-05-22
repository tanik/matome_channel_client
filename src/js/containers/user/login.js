import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { loginAsync } from '../../actions/user/login'
import Login from '../../components/user/login'


function mapStateToProps(state) {
  return state.login
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => {
      dispatch(loginAsync(email, password))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
