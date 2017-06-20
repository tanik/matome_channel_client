import * as action_type from '../../constants/action_types'

const initialState = {
  board: {},
  has_more_images: false,
  has_more_websites: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.GET_BOARD: {
      const has_more_websites = (action.board.websites.length == 20)
      const has_more_images = (action.board.images.length == 20)
      return {
        board: action.board,
        has_more_images: has_more_images,
        has_more_websites: has_more_websites,
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
          comments: comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
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
          comments: board.comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
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
          comments: comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
      }
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
          comments: board.comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
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
          comments: board.comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
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
          comments: comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
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
          comments: comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
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
          comments: comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: state.has_more_websites,
      }
    }
    case action_type.GET_WEBSITES_SUCCESS: {
      let board = state.board
      let websites = board.websites.slice(0)
      const has_more_websites = (action.websites.length != 0)
      websites = websites.concat(action.websites)
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
          websites: websites,
          thumbnail_url: board.thumbnail_url,
          favorite_user_ids: board.favorite_user_ids,
          comments: board.comments,
        },
        has_more_images: state.has_more_images,
        has_more_websites: has_more_websites,
      }
    }
    case action_type.GET_IMAGES_SUCCESS: {
      let board = state.board
      let images = board.images.slice(0)
      const has_more_images = (action.images.length != 0)
      images = images.concat(action.images)
      return {
        board: {
          id: board.id,
          title: board.title,
          fav_count: board.fav_count,
          first_comment: board.first_comment,
          res_count: board.res_count,
          score: board.score,
          category_tree: board.category_tree,
          images: images,
          websites: board.websites,
          thumbnail_url: board.thumbnail_url,
          favorite_user_ids: board.favorite_user_ids,
          comments: board.comments,
        },
        has_more_images: has_more_images,
        has_more_websites: state.has_more_websites,
      }
    }
    default:
      return state
  }
}
