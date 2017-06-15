import * as action_type from '../../constants/action_types'

const initialState = {
  loading: true,
  comments: [],
  populars: [],
  recommends: [],
  histories: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.GET_MYPAGE_INFO: {
      return {
        loading: state.loading,
        comments: action.data.comments,
        populars: action.data.populars,
        recommends: action.data.recommends,
        histories: action.data.histories,
      }
    }
    case action_type.SET_MYPAGE_LOADING: {
      return {
        loading: action.loading,
        comments: state.comments,
        populars: state.populars,
        recommends: state.recommends,
        histories: state.histories,
      }
    }
    default:
      return state
  }
}
