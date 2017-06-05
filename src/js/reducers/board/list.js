import * as action_type from '../../constants/action_types'

const initialState = {
  categories: [],
  selected_category_id: 0,
  boards: [],
  per: 20,
  page: 1,
  total_page: 1,
  next_page: null,
  prev_page: null,
  post_board_result: {},
}

export default function board_list_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.GET_BOARDS: {
      return {
        boards: action.boards,
        per: action.pagination.per,
        page: action.pagination.current,
        total_page: action.pagination.total,
        next_page: action.pagination.next,
        prev_page: action.pagination.prev,
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
        total_page: state.total_page,
        next_page: state.next_page,
        prev_page: state.prev_page,
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
        total_page: state.total_page,
        next_page: state.next_page,
        prev_page: state.prev_page,
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
        total_page: state.total_page,
        next_page: state.next_page,
        prev_page: state.prev_page,
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
        total_page: state.total_page,
        next_page: state.next_page,
        prev_page: state.prev_page,
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
