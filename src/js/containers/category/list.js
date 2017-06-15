import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { getCategoriesAsync, changeCategory } from '../../actions/category/list'
import CategoryList from '../../components/category/list'

function mapStateToProps(state) {
  return state.category_list
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      dispatch(getCategoriesAsync())
    },
    changeCategory: (category_id) => {
      dispatch(changeCategory(category_id))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList))
