import * as action_type from '../../constants/action_types'

const initialState = {
  show: false,
  comment: {},
  related_comments: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.CHANGE_MODAL_COMMENTS: {
      return({
        show: state.show,
        comment: action.comment,
        related_comments: action.related_comments,
      })
    }
    case action_type.OPEN_COMMENT_MODAL: {
      return({
        show: true,
        comment: state.comment,
        related_comments: state.related_comments,
      })
    }
    case action_type.CLOSE_COMMENT_MODAL: {
      return({
        show: false,
        comment: state.comment,
        related_comments: state.related_comments,
      })
    }
    case action_type.CHANGE_FAVORITE_COMMENT_ON_MODAL: {
      let comment = state.comment
      if(comment.id == action.favorite.comment_id){
        comment.favorite_user_ids.push(action.favorite.user_id)
      }
      let related_comments = state.related_comments.map( (comment) => {
        if(comment.id == action.favorite.comment_id){
          comment.favorite_user_ids.push(action.favorite.user_id)
        }
        return(comment)
      })
      return({
        show: state.show,
        comment: comment,
        related_comments: related_comments,
      })
    }
    default: {
      return state
    }
  }
}
