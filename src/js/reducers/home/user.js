import * as action_type from '../../constants/action_types'

const initialState = {
  loading: true,
  has_more_comments: true,
  comments: [],
  populars: [],
  recommends: [],
  histories: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.GET_MYPAGE_INFO: {
      const has_more_comments = (action.data.comments.length == 20)
      return {
        loading: state.loading,
        has_more_comments: has_more_comments,
        comments: action.data.comments,
        populars: action.data.populars,
        recommends: action.data.recommends,
        histories: action.data.histories,
      }
    }
    case action_type.SET_MYPAGE_LOADING: {
      return {
        loading: action.loading,
        has_more_comments: state.has_more_comments,
        comments: state.comments,
        populars: state.populars,
        recommends: state.recommends,
        histories: state.histories,
      }
    }
    case action_type.ADD_COMMENT_ON_TL: {
      let comments = state.comments.slice(0)
      comments.unshift(action.comment)
      return {
        loading: state.loading,
        has_more_comments: state.has_more_comments,
        comments: comments,
        populars: state.populars,
        recommends: state.recommends,
        histories: state.histories,
      }
    }
    case action_type.ADD_COMMENT_WEBSITE_ON_TL: {
      let comments = state.comments.map( (comment) => {
        if(comment.id == action.comment_website.comment_id){
          comment.websites.push(action.comment_website.website)
        }
        return(comment)
      })
      return {
        loading: state.loading,
        has_more_comments: state.has_more_comments,
        comments: comments,
        populars: state.populars,
        recommends: state.recommends,
        histories: state.histories,
      }
    }
    case action_type.ADD_COMMENT_IMAGE_ON_TL: {
      let comments = state.comments.map( (comment) => {
        if(comment.id == action.comment_image.comment_id){
          comment.images.push(action.comment_image.image)
        }
        return(comment)
      })
      return {
        loading: state.loading,
        has_more_comments: state.has_more_comments,
        comments: comments,
        populars: state.populars,
        recommends: state.recommends,
        histories: state.histories,
      }
    }
    case action_type.CHANGE_FAVORITE_COMMENT_ON_TL: {
      let comments = state.comments.map( (comment) => {
        if(comment.id == action.favorite.comment_id){
          comment.favorite_user_ids.push(action.favorite.user_id)
        }
        return(comment)
      })
      return {
        loading: state.loading,
        has_more_comments: state.has_more_comments,
        comments: comments,
        populars: state.populars,
        recommends: state.recommends,
        histories: state.histories,
      }
    }
    case action_type.GET_MORE_COMMENTS_ON_TL: {
      let comments = state.comments.slice(0)
      const has_more_comments = (action.comments.length == 20)
      comments = comments.concat(action.comments)
      return {
        loading: state.loading,
        has_more_comments: has_more_comments,
        comments: comments,
        populars: state.populars,
        recommends: state.recommends,
        histories: state.histories,
      }
    }
    default:
      return state
  }
}
