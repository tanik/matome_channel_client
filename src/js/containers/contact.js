import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { postContactAsync, setContactErrors } from '../actions/contact'
import Contact from '../components/contact'


function mapStateToProps(state) {
  return state.contact
}

function mapDispatchToProps(dispatch) {
  return {
    setContactErrors: (errors) => {
      dispatch(setContactErrors(errors))
    },
    postContact: (email, content) => {
      dispatch(postContactAsync(email, content))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact))
