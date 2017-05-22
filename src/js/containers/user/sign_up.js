import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { signUpAsync } from '../../actions/user/sign_up'
import SignUp from '../../components/user/sign_up'


function mapStateToProps(state) {
  return state.sign_up
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (email, password, password_confirmation) => {
      dispatch(signUpAsync(email, password, password_confirmation))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
