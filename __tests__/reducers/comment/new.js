import reducer from '../../../src/js/reducers/comment/new'
import * as types from '../../../src/js/constants/action_types'

describe('new comment modal reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      show: false,
      content: '',
    })
  })

  it('should handle OPEN_NEW_COMMENT_MODAL', () => {
    const prevState = {
      show: false,
      content: '',
    }
    const content = 'content'
    expect(
      reducer(prevState, {
        type: types.OPEN_NEW_COMMENT_MODAL, content
      })
    ).toEqual({
      show: true,
      content,
    })
  })

  it('should handle CLOSE_NEW_COMMENT_MODAL', () => {
    const prevState = {
      show: true,
      content: 'content',
    }
    expect(
      reducer(prevState, {
        type: types.CLOSE_NEW_COMMENT_MODAL
      })
    ).toEqual({
      show: false,
      content: '',
    })
  })

  it('should handle POST_COMMENT_SUCCESS', () => {
    const prevState = {
      show: true,
      content: 'content',
    }
    const response = {
      id: 1,
      name: 'test',
      content: 'written content'
    }
    expect(
      reducer(prevState, {
        type: types.POST_COMMENT_SUCCESS, response
      })
    ).toEqual({
      show: false,
      content: 'written content',
    })
  })

  it('should handle POST_COMMENT_FAILURE', () => {
    const prevState = {
      show: true,
      content: 'content',
    }
    const errors = {
      content: 'が不正です',
    }
    expect(
      reducer(prevState, {
        type: types.POST_COMMENT_FAILURE, errors
      })
    ).toEqual(prevState)
  })
})
