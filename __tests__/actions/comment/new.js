import * as actions from '../../../src/js/actions/comment/new'
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
  it('should create an action to post comment async success', () => {
    const board_id = 1
    const name = ""
    const content = "test content"
    const response = {
      id: 1,
      name: name,
      content: content,
    }
    nock(host)
      .post(`/boards/${board_id}/comments`)
      .reply(201, response)
    const expectedActions = [{
      type: types.POST_COMMENT_SUCCESS,
      response: response,
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.postCommentAsync(board_id, name, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to post comment async failure', () => {
    const board_id = 1
    const name = ""
    const content = "test content"
    const errors = {
      name: ['は1文字以上で入力してください'],
      content: ['は1文字以上で入力してください'],
    }
    const error_messages = [
      '名前は1文字以上で入力してください',
      'コメントは1文字以上で入力してください',
    ]
    nock(host)
      .post(`/boards/${board_id}/comments`)
      .reply(422, errors)
    const expectedActions = [{
      type: types.POST_COMMENT_FAILURE,
      error: errors,
    },{
      type: types.SET_ERRORS,
      errors: error_messages,
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.postCommentAsync(board_id, name, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to open new comment modal', () => {
    const expectedAction = {
      type: types.OPEN_NEW_COMMENT_MODAL,
    }
    expect(actions.openNewCommentModal()).toEqual(expectedAction)
  })

  it('should create an action to close new comment modal', () => {
    const expectedAction = {
      type: types.CLOSE_NEW_COMMENT_MODAL,
    }
    expect(actions.closeNewCommentModal()).toEqual(expectedAction)
  })
})
