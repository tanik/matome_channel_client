import * as action_type from '../../constants/action_types'

const initialState = {
  boards: [],
  per: 20,
  page: 1,
  total_page: 1,
  next_page: null,
  prev_page: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.GET_MY_BOARDS: {
      return {
        boards: action.boards,
        per: action.pagination.per,
        page: action.pagination.current,
        total_page: action.pagination.total,
        next_page: action.pagination.next,
        prev_page: action.pagination.prev,
      }
    }
    default:
      return state
  }
}
