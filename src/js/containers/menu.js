import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import Menu from '../components/menu'


//function mapStateToProps(state) {
//  return state.menu
//}

//function mapDispatchToProps(dispatch) {
//  return {
//  }
//}
export default withRouter(connect()(Menu))
