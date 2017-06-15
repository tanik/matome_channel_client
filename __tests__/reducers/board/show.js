import reducer from '../../../src/js/reducers/board/show'
import * as types from '../../../src/js/constants/action_types'

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
      comments: [{content: "comment"}],
      images: [],
      websites: [],
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
      comments: [{content: "comment"}],
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
        comments: [{content: "comment2"}, {content: "comment"}],
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
      comments: [{id: 1, content: "comment", favorite_user_ids: []}],
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
        comments: [{id: 1, content: "comment", favorite_user_ids: [1]}],
      },
      has_more_images,
      has_more_websites,
      post_comment_result
    })
  })
})
