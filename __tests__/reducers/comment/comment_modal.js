import reducer from '../../../src/js/reducers/comment/comment_modal'
import * as types from '../../../src/js/constants/action_types'

describe('comment modal reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      show: false,
      comment: {},
      related_comments: [],
    })
  })

  it('should handle CHANGE_MODAL_COMMENTS', () => {
    const prevState = {
      show: false,
      comment: {},
      related_comments: [],
    }
    const comment = {
      id: 1,
      num: 1,
      name: 'comment name',
      content: 'comment content',
    }
    const related_comments = [{
      id: 2,
      num: 2,
      name: 'comment name',
      content: 'comment content2',
    }, {
      id: 3,
      num: 3,
      name: 'comment name',
      content: 'comment content3',
    }]
    expect(
      reducer(prevState, {
        type: types.CHANGE_MODAL_COMMENTS, comment, related_comments
      })
    ).toEqual({
      show: false,
      comment,
      related_comments,
    })
  })

  it('should handle OPEN_COMMENT_MODAL', () => {
    const prevState = {
      show: false,
      comment: {},
      related_comments: [],
    }
    expect(
      reducer(prevState, {
        type: types.OPEN_COMMENT_MODAL
      })
    ).toEqual({
      show: true,
      comment: {},
      related_comments: [],
    })
  })

  it('should handle CLOSE_COMMENT_MODAL', () => {
    const prevState = {
      show: true,
      comment: {},
      related_comments: [],
    }
    expect(
      reducer(prevState, {
        type: types.CLOSE_COMMENT_MODAL
      })
    ).toEqual({
      show: false,
      comment: {},
      related_comments: [],
    })
  })

  it('should handle CHANGE_FAVORITE_COMMENT_ON_MODAL', () => {
    const comment = {
      id: 1,
      num: 1,
      name: 'comment name',
      content: 'comment content',
      favorite_user_ids: [],
    }
    const related_comments = [{
      id: 1,
      num: 1,
      name: 'comment name1',
      content: 'comment content1',
      favorite_user_ids: [],
    }, {
      id: 2,
      num: 2,
      name: 'comment name2',
      content: 'comment content2',
      favorite_user_ids: [],
    }]
    const prevState = {
      show: false,
      comment,
      related_comments,
    }
    const favorite = {
      id: 1,
      user_id: 1,
      comment_id: 1,
    }
    expect(
      reducer(prevState, {
        type: types.CHANGE_FAVORITE_COMMENT_ON_MODAL, favorite
      })
    ).toEqual({
      show: false,
      comment: {
        id: 1,
        num: 1,
        name: 'comment name',
        content: 'comment content',
        favorite_user_ids: [favorite.user_id],
      },
      related_comments: [{
        id: 1,
        num: 1,
        name: 'comment name1',
        content: 'comment content1',
        favorite_user_ids: [favorite.user_id],
      }, {
        id: 2,
        num: 2,
        name: 'comment name2',
        content: 'comment content2',
        favorite_user_ids: [],
      }],
    })
  })
})
