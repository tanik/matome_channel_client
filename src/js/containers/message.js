import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { setNotices, setErrors, clearMessages } from '../actions/message'
import Message from '../components/message'


function mapStateToProps(state) {
  return state.message
}

function mapDispatchToProps(dispatch) {
  return {
    setNotices: (notices) => {
      dispatch(setNotices(notices))
    },
    setErrors: (errors) => {
      dispatch(setErrors(errors))
    },
    clearMessages: () => {
      dispatch(clearMessages())
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message))
