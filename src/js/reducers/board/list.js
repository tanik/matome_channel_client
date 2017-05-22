import * as action_type from '../../constants/action_types'

const initialState = {
  boards: [],
  per: 20,
  page: 1
}

export default function board_list_reducer(state = initialState, action) {
  switch(action.type) {
    case action_type.GET_BOARD_LIST: {
      return {
        boards: action.boards,
        per: action.per,
        page: action.page
      }
    }
    default:
      return state
  }
}
