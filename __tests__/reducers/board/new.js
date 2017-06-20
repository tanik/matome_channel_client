import reducer from '../../../src/js/reducers/board/new'
import * as types from '../../../src/js/constants/action_types'

describe('new board reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      show: false,
      categories: [],
      post_board_result: {},
    })
  })

  it('should handle SET_NEW_BOARD_CATEGORIES', () => {
    const prevState = {
      show: false,
      categories: [],
      post_board_result: {}
    }
    const categories = [
      {id: 1, name: 'cat 1', parent_id: null},
      {id: 2, name: 'cat 2', parent_id: 1},
    ]
    expect(
      reducer(prevState, {
        type: types.SET_NEW_BOARD_CATEGORIES, categories
      })
    ).toEqual({
      show: false,
      categories,
      post_board_result: {}
    })
  })

  it('should handle OPEN_NEW_BOARD_MODAL', () => {
    const prevState = {
      show: false,
      categories: [],
      post_board_result: {}
    }
    expect(
      reducer(prevState, {
        type: types.OPEN_NEW_BOARD_MODAL
      })
    ).toEqual({
      show: true,
      categories: [],
      post_board_result: {}
    })
  })

  it('should handle CLOSE_NEW_BOARD_MODAL', () => {
    const prevState = {
      show: true,
      categories: [],
      post_board_result: {}
    }
    expect(
      reducer(prevState, {
        type: types.CLOSE_NEW_BOARD_MODAL
      })
    ).toEqual({
      show: false,
      categories: [],
      post_board_result: {}
    })
  })

  it('should handle POST_BOARD_SUCCESS', () => {
    const prevState = {
      show: false,
      categories: [],
      post_board_result: {}
    }
    const response = {
      id: 1,
      title: 'board title',
    }
    expect(
      reducer(prevState, {
        type: types.POST_BOARD_SUCCESS, response
      })
    ).toEqual({
      show: false,
      categories: [],
      post_board_result: {
        state: "success",
        response,
      }
    })
  })

  it('should handle POST_BOARD_FAILURE', () => {
    const prevState = {
      show: false,
      categories: [],
      post_board_result: {}
    }
    const error = {
      title: 'は1文字以上入力してください。'
    }
    expect(
      reducer(prevState, {
        type: types.POST_BOARD_FAILURE, error
      })
    ).toEqual({
      show: false,
      categories: [],
      post_board_result: {
        state: "failure",
        error,
      }
    })
  })

  it('should handle CLEAR_POST_RESULT', () => {
    const prevState = {
      show: true,
      categories: [],
      post_board_result: {
        state: "success",
        response: {
          id: 1,
          title: 'board title',
        }
      }
    }
    expect(
      reducer(prevState, {
        type: types.CLEAR_POST_RESULT
      })
    ).toEqual({
      show: false,
      categories: [],
      post_board_result: {}
    })
  })
})
