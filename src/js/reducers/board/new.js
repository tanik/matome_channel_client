import * as action_type from '../../constants/action_types'

const initialState = {
  show: false,
  categories: [],
  post_board_result: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.SET_NEW_BOARD_CATEGORIES: {
      return {
        show: state.show,
        categories: action.categories,
        post_board_result: state.post_board_result,
      }
    }
    case action_type.OPEN_NEW_BOARD_MODAL: {
      return {
        show: true,
        categories: state.categories,
        post_board_result: state.post_board_result,
      }
    }
    case action_type.CLOSE_NEW_BOARD_MODAL: {
      return {
        show: false,
        categories: state.categories,
        post_board_result: state.post_board_result,
      }
    }
    case action_type.POST_BOARD_SUCCESS: {
      return {
        show: state.show,
        categories: state.categories,
        post_board_result: {
          state: "success",
          response: action.response,
        },
      }
    }
    case action_type.POST_BOARD_FAILURE: {
      return {
        show: state.show,
        categories: state.categories,
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
