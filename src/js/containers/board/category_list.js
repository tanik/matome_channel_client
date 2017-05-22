import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { changeCategory, getCategoryListAsync } from '../../actions/board/category_list'
import CategoryList from '../../components/board/category_list'

function mapStateToProps(state) {
  return state.category_list
}

function mapDispatchToProps(dispatch) {
  return {
    getCategoryList: () => {
      dispatch(getCategoryListAsync())
    },
    changeCategory: (category_id) => {
      dispatch(changeCategory(category_id))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList))
