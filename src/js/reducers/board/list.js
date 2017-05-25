import * as action_type from '../../constants/action_types'

const initialState = {
  categories: [],
  selected_category_id: 0,
  boards: [],
  per: 20,
  page: 1,
  post_board_result: {},
}

export default function board_list_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.GET_BOARDS: {
      return {
        boards: action.boards,
        per: action.per,
        page: action.page,
        categories: state.categories,
        selected_category_id: state.selected_category_id,
        post_board_result: {},
      }
    }
    case action_type.GET_CATEGORIES: {
      return {
        boards: state.boards,
        per: state.per,
        page: state.page,
        categories: action.categories,
        selected_category_id: state.selected_category_id,
        post_board_result: {},
      }
    }
    case action_type.CHANGE_CATEGORY: {
      return {
        boards: state.boards,
        per: state.per,
        page: state.page,
        categories: state.categories,
        selected_category_id: Number(action.category_id),
        post_board_result: {},
      }
    }
    case action_type.POST_BOARD_SUCCESS: {
      return {
        boards: state.boards,
        per: state.per,
        page: state.page,
        categories: state.categories,
        selected_category_id: Number(action.category_id),
        post_board_result: {
          state: "success",
          response: action.response,
        },
      }
    }
    case action_type.POST_BOARD_FAILURE: {
      return {
        boards: state.boards,
        per: state.per,
        page: state.page,
        categories: state.categories,
        selected_category_id: Number(action.category_id),
        post_board_result: {
          state: "failure",
          error: action.error,
        },
      }
    }
    default:
      return state
  }
}
