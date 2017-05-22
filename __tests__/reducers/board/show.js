import reducer from '../../../src/js/reducers/board/show'
import * as types from '../../../src/js/constants/action_types'

describe('category list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({board: {}})
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
    }
    const prevState = {board}
    expect(
      reducer(prevState, {
        type: types.GET_BOARD, board
      })
    ).toEqual({board})
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
    const prevState = {board}
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
      }
    })
  })
})
