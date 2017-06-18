import reducer from '../../../src/js/reducers/board/show'
import * as types from '../../../src/js/constants/action_types'

const category_tree = [{
  id: 1,
  name: 'cat 1',
  parent_id: null
},{
  id: 2,
  name: 'cat 2',
  parent_id: 1
}]
const websites = []
const images = []

describe('category list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      board: {},
      has_more_images: false,
      has_more_websites: false,
      post_comment_result: {},
    })
  })

  it('should handle GET_BOARD', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{content: "comment"}],
      images,
      websites,
      favorite_user_ids: [],
    }
    const has_more_images = false
    const has_more_websites = false
    const post_comment_result = {}
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    expect(
      reducer(prevState, {
        type: types.GET_BOARD, board
      })
    ).toEqual({board, has_more_images, has_more_websites, post_comment_result})
  })

  it('should handle ADD_COMMENT', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{content: "comment"}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const comment = {content: "comment2"} 
    expect(
      reducer(prevState, {
        type: types.ADD_COMMENT, comment
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{content: "comment2"}, {content: "comment"}],
        websites,
        images,
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle CHANGE_FAVORITE_BOARD', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const favorite = {id: 1, user_id: 1, board_id: 1}
    expect(
      reducer(prevState, {
        type: types.CHANGE_FAVORITE_BOARD, favorite
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: []}],
        websites,
        images,
        favorite_user_ids: [favorite.user_id],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle CHANGE_FAVORITE_COMMENT', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const favorite = {id: 1, user_id: 1, comment_id: 1} 
    expect(
      reducer(prevState, {
        type: types.CHANGE_FAVORITE_COMMENT, favorite
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: [1]}],
        websites,
        images,
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle POST_COMMENT_SUCCESS', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const response = {id: 1, name: 'test name', content: 'test content'}
    expect(
      reducer(prevState, {
        type: types.POST_COMMENT_SUCCESS, response
      })
    ).toEqual({
      board,
      has_more_images,
      has_more_websites,
      post_comment_result: {
        state: 'success',
        response
      }
    })
  })

  it('should handle POST_COMMENT_FAILURE', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const error = {name: ['は1文字以上入力してください。']}
    expect(
      reducer(prevState, {
        type: types.POST_COMMENT_FAILURE, error
      })
    ).toEqual({
      board,
      has_more_images,
      has_more_websites,
      post_comment_result: {
        state: 'failure',
        error
      }
    })
  })

  it('should handle ADD_BOARD_IMAGE', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const board_image = {
      id: 1,
      board_id: 1,
      image: {
        id: 1,
        original_url: 'https://example.com/original.png',
        thumbnail_url: 'https://img.m-ch.xyz/thumbnail.png',
        full_url: 'https://img.m-ch.xyz/full.png'
      }
    }
    expect(
      reducer(prevState, {
        type: types.ADD_BOARD_IMAGE, board_image
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: []}],
        websites,
        images: [board_image],
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle ADD_BOARD_WEBSITE', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const board_website = {
      id: 1,
      board_id: 1,
      website: {
        id: 1,
        title: 'Example',
        original_url: 'https://example.com',
        thumbnail_url: 'https://img.m-ch.xyz/thumbnail.png',
        full_url: 'https://img.m-ch.xyz/full.png'
      }
    }
    expect(
      reducer(prevState, {
        type: types.ADD_BOARD_WEBSITE, board_website
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: []}],
        websites: [board_website],
        images,
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle ADD_COMMENT_IMAGE', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const comment_image = {
      id: 1,
      comment_id: 1,
      image: {
        id: 1,
        original_url: 'https://example.com/original.png',
        thumbnail_url: 'https://img.m-ch.xyz/thumbnail.png',
        full_url: 'https://img.m-ch.xyz/full.png'
      }
    }
    expect(
      reducer(prevState, {
        type: types.ADD_COMMENT_IMAGE, comment_image
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [comment_image.image], websites: []}],
        websites,
        images,
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle ADD_COMMENT_WEBSITE', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const comment_website = {
      id: 1,
      comment_id: 1,
      website: {
        id: 1,
        title: 'Example',
        original_url: 'https://example.com',
        thumbnail_url: 'https://img.m-ch.xyz/thumbnail.png',
        full_url: 'https://img.m-ch.xyz/full.png'
      }
    }
    expect(
      reducer(prevState, {
        type: types.ADD_COMMENT_WEBSITE, comment_website
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: [], images, websites: [comment_website.website]}],
        websites,
        images,
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle GET_COMMENTS_SUCCESS', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const comments = [
      {id: 2, content: "comment2", favorite_user_ids: [], images: [], websites: []},
    ]
    expect(
      reducer(prevState, {
        type: types.GET_COMMENTS_SUCCESS, comments
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [
          {id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []},
          {id: 2, content: "comment2", favorite_user_ids: [], images: [], websites: []},
        ],
        websites,
        images,
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })

  it('should handle GET_WEBSITES_SUCCESS', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const board_websites = [{
      id: 1,
      board_id: 1,
      website: {
        id: 1,
        title: 'Example',
        original_url: 'https://example.com',
        thumbnail_url: 'https://img.m-ch.xyz/thumbnail.png',
        full_url: 'https://img.m-ch.xyz/full.png'
      }
    }]
    expect(
      reducer(prevState, {
        type: types.GET_WEBSITES_SUCCESS, websites: board_websites
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []}],
        websites: board.websites.concat(board_websites),
        images,
        favorite_user_ids: [],
      },
      has_more_images,
      has_more_websites: true,
      post_comment_result
    })
  })

  it('should handle GET_IMAGES_SUCCESS', () => {
    const board =  {
      id: 1,
      title: "title",
      fav_count: 1,
      first_comment: "comment",
      res_count: 1,
      score: 20,
      thumbnail_url: "/images/placeholder.png",
      category_tree,
      comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []}],
      websites,
      images,
      favorite_user_ids: [],
    }
    const post_comment_result = {}
    const has_more_images = false
    const has_more_websites = false
    const prevState = {board, has_more_images, has_more_websites, post_comment_result}
    const board_images = [{
      id: 1,
      board_id: 1,
      image: {
        id: 1,
        original_url: 'https://example.com/original.png',
        thumbnail_url: 'https://img.m-ch.xyz/thumbnail.png',
        full_url: 'https://img.m-ch.xyz/full.png'
      }
    }]
    expect(
      reducer(prevState, {
        type: types.GET_IMAGES_SUCCESS, images: board_images
      })
    ).toEqual({
      board: {
        id: 1,
        title: "title",
        fav_count: 1,
        first_comment: "comment",
        res_count: 1,
        score: 20,
        thumbnail_url: "/images/placeholder.png",
        category_tree,
        comments: [{id: 1, content: "comment", favorite_user_ids: [], images: [], websites: []}],
        websites,
        images: board.images.concat(board_images),
        favorite_user_ids: [],
      },
      has_more_images: true,
      has_more_websites,
      post_comment_result
    })
  })
})
