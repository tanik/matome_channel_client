import * as action_type from '../../constants/action_types'

const initialState = {
  categories: [],
  selected_id: 0,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.GET_CATEGORIES: {
      return {
        categories: action.categories,
        selected_id: state.selected_id,
      }
    }
    case action_type.CHANGE_CATEGORY: {
      return {
        categories: state.categories,
        selected_id: action.category_id,
      }
    }
    default:
      return state
  }
}
