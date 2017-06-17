import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { getMyCommentsAsync } from '../../actions/user/comment'
import MyComments from '../../components/user/comment'

function mapStateToProps(state) {
  return state.my_comments
}

function mapDispatchToProps(dispatch) {
  return {
    getMyComments: (type, page, per) => {
      dispatch(getMyCommentsAsync(type, page, per))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyComments))
