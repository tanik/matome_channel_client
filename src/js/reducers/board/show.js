import * as action_type from '../../constants/action_types'

const initialState = {
  board: {},
  post_comment_result: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.GET_BOARD: {
      return {
        board: action.board,
        post_comment_result: {},
      }
    }
    case action_type.ADD_COMMENT: {
      let board = state.board
      let comments = board.comments.slice(0)
      comments.unshift(action.comment)
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          category_tree: board.category_tree,
          images: board.images,
          websites: board.websites,
          favorite_user_ids: board.favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.CHANGE_FAVORITE_BOARD: {
      let board = state.board
      let favorite_user_ids = board.favorite_user_ids || []
      favorite_user_ids.push(action.favorite.user_id)
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          category_tree: board.category_tree,
          images: board.images,
          websites: board.websites,
          favorite_user_ids: favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: board.comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.CHANGE_FAVORITE_COMMENT: {
      let board = state.board
      let comments = board.comments.map( (comment) => {
        if(comment.id == action.favorite.comment_id){
          comment.favorite_user_ids.push(action.favorite.user_id)
        }
        return(comment)
      })
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          category_tree: board.category_tree,
          images: board.images,
          websites: board.websites,
          favorite_user_ids: board.favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.POST_COMMENT_SUCCESS: {
      return({
        board: state.board,
        post_comment_result: {
          state: "success",
          response: action.response,
        }
      })
    }
    case action_type.POST_COMMENT_FAILURE: {
      return({
        board: state.board,
        post_comment_result: {
          state: "failure",
          error: action.error,
        }
      })
    }
    case action_type.ADD_BOARD_IMAGE: {
      let board = state.board
      let images = board.images.slice(0)
      images.unshift(action.board_image)
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          category_tree: board.category_tree,
          images: images,
          websites: board.websites,
          favorite_user_ids: board.favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: board.comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.ADD_BOARD_WEBSITE: {
      let board = state.board
      let websites = board.websites.slice(0)
      websites.unshift(action.board_website)
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          category_tree: board.category_tree,
          images: board.images,
          websites: websites,
          favorite_user_ids: board.favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: board.comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.ADD_COMMENT_IMAGE: {
      let board = state.board
      let comments = board.comments.map( (comment) => {
        if(comment.id == action.comment_image.comment_id){
          comment.images.push(action.comment_image.image)
        }
        return(comment)
      })
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          category_tree: board.category_tree,
          images: board.images,
          websites: board.websites,
          favorite_user_ids: board.favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.ADD_COMMENT_WEBSITE: {
      let board = state.board
      let comments = board.comments.map( (comment) => {
        if(comment.id == action.comment_website.comment_id){
          comment.websites.push(action.comment_website.website)
        }
        return(comment)
      })
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          thumbnail_url: board.thumbnail_url,
          category_tree: board.category_tree,
          images: board.images,
          websites: board.websites,
          favorite_user_ids: board.favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.GET_COMMENTS_SUCCESS: {
      let board = state.board
      let comments = board.comments.slice(0)
      comments = comments.concat(action.comments)
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          category_tree: board.category_tree,
          images: board.images,
          websites: board.websites,
          thumbnail_url: board.thumbnail_url,
          favorite_user_ids: board.favorite_user_ids,
          current_user_id: board.current_user_id,
          comments: comments,
        },
        post_comment_result: {},
      }
    }
    case action_type.GET_COMMENTS_FAILURE: {
      // TODO
      return state
    }
    default:
      return state
  }
}
