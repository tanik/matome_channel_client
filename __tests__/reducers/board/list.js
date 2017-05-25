import reducer from '../../../src/js/reducers/board/list'
import * as types from '../../../src/js/constants/action_types'

describe('board list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      boards: [],
      per: 20,
      page: 1,
      categories: [],
      selected_category_id: 0,
      post_board_result: {},
    })
  })

  it('should handle GET_BOARDS', () => {
    const boards = [{title: "test"}]
    const per    = 30
    const page   = 10
    const prevState = {
      boards: [],
      per: 20,
      page: 1,
      categories: [],
      selected_category_id: 0,
      post_board_result: {},
    }
    expect(
      reducer(prevState, {
        type: types.GET_BOARDS, boards, per, page
      })
    ).toEqual({
      boards,
      per,
      page,
      categories: [],
      selected_category_id: 0,
      post_board_result: {},
    })
  })

  it('should handle GET_CATEGORIES', () => {
    const categories = [{name: "test"}]
    const prevState = {
      boards: [],
      per: 20,
      page: 1,
      categories: [],
      selected_category_id: 0,
      post_board_result: {},
    }
    expect(
      reducer(prevState, {
        type: types.GET_CATEGORIES,
        categories
      })
    ).toEqual({
      boards: [],
      per: 20,
      page: 1,
      categories: categories,
      selected_category_id: 0,
      post_board_result: {},
    })
  })

  it('should handle CHANGE_CATEGORY', () => {
    const category_id = 1
    const prevState = {
      boards: [],
      per: 20,
      page: 1,
      categories: [],
      selected_category_id: 0,
      post_board_result: {},
    }
    expect(
      reducer(prevState, {
        type: types.CHANGE_CATEGORY,
        category_id
      })
    ).toEqual({
      boards: [],
      per: 20,
      page: 1,
      categories: [],
      selected_category_id: category_id,
      post_board_result: {},
    })
  })
})
