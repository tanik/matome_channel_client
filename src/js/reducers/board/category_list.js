import * as action_type from '../../constants/action_types'

const initialState = {
  categories: [],
  selected_category_id: 0,
}

export default function category_list_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.GET_CATEGORY_LIST: {
      return {
        categories: action.categories,
        selected_category_id: state.selected_category_id,
      }
    }
    case action_type.CHANGE_CATEGORY: {
      return {
        categories: state.categories,
        selected_category_id: Number(action.category_id),
      }
    }
    default:
      return state
  }
}
