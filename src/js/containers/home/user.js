import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { getMypageInfomationsAsync } from '../../actions/home/user'
import UserHome from '../../components/home/user'

function mapStateToProps(state) {
  return state.user_home
}

function mapDispatchToProps(dispatch) {
  return {
    getMypageInfomations: () => {
      dispatch(getMypageInfomationsAsync())
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHome))
