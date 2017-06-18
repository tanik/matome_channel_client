import * as actions from '../../../src/js/actions/comment/comment_modal'
import * as types from '../../../src/js/constants/action_types'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import '../../../__mock__/localstrage'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const host = APP_CONFIG.API_BASE
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

console.error = () => {}

describe('actions', () => {
  it('should create an action to open comment modal', () => {
    const expectedAction = {
      type: types.OPEN_COMMENT_MODAL,
    }
    expect(actions.openCommentModal()).toEqual(expectedAction)
  })

  it('should create an action to close comment modal', () => {
    const expectedAction = {
      type: types.CLOSE_COMMENT_MODAL,
    }
    expect(actions.closeCommentModal()).toEqual(expectedAction)
  })
  it('should create an action to change modal comments', () => {
    const comment = {
      id: 1,
    }
    const related_comments = []
    const expectedAction = {
      type: types.CHANGE_MODAL_COMMENTS,
      comment: comment,
      related_comments: related_comments,
    }
    expect(actions.changeModalComments(comment, related_comments)).toEqual(expectedAction)
  })

  it('should create an action to get comments by num async success', () => {
    const board_id = 1
    const num = 1
    const resp_data = {
      comment:{
        id: 1,
      },
      related_comments: [
      ]
    }
    nock(host)
      .get(`/boards/${board_id}/comments/num/${num}`)
      .reply(200, resp_data)
    const expectedActions = [{
      type: types.CHANGE_MODAL_COMMENTS,
      comment: resp_data.comment,
      related_comments: resp_data.related_comments,
    }]
    const store = mockStore({})
    return store.dispatch(actions.getCommentsByNumAsync(board_id, num)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get comments by num async failure', () => {
    const board_id = 1
    const num = 1
    nock(host)
      .get(`/boards/${board_id}/comments/num/${num}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({})
    return store.dispatch(actions.getCommentsByNumAsync(board_id, num)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  it('should create an action to get related comments async success', () => {
    const comment = {
      id: 1,
      board_id: 1,
    }
    const resp_data = {
      comment:{
        id: 1,
      },
      related_comments: [
      ]
    }
    nock(host)
      .get(`/boards/${comment.board_id}/comments/${comment.id}`)
      .reply(200, resp_data)
    const expectedActions = [{
      type: types.CHANGE_MODAL_COMMENTS,
      comment: resp_data.comment,
      related_comments: resp_data.related_comments,
    }]
    const store = mockStore({})
    return store.dispatch(actions.getRelatedCommentsAsync(comment)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get comments by num async failure', () => {
    const comment = {
      id: 1,
      board_id: 1,
    }
    nock(host)
      .get(`/boards/${comment.board_id}/comments/${comment.id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({})
    return store.dispatch(actions.getRelatedCommentsAsync(comment)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to change favorite comment on modal', () => {
    const favorite = {
      id: 1,
      user_id: 1,
      comment_id: 1,
    }
    const expectedAction = {
      type: types.CHANGE_FAVORITE_COMMENT_ON_MODAL,
      favorite
    }
    expect(actions.changeFavoriteCommentOnModal(favorite)).toEqual(expectedAction)
  })

})
