import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import { getBoardsAsync, getCategoriesAsync, changeCategory, postBoardAsync } from '../../actions/board/list'
import BoardList from '../../components/board/list'

function mapStateToProps(state) {
  return state.board_list
}

function mapDispatchToProps(dispatch) {
  return {
    getBoards: (page, per, category_id) => {
      dispatch(getBoardsAsync(page, per, category_id))
    },
    getCategories: () => {
      dispatch(getCategoriesAsync())
    },
    changeCategory: (category_id) => {
      dispatch(changeCategory(category_id))
    },
    postBoard: (category_id, title,  name, content) => {
      dispatch(postBoardAsync(category_id, title,  name, content))
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardList))
