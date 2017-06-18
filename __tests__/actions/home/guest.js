import * as actions from '../../../src/js/actions/home/guest'
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
  it('should create an action to get popular boards async success', () => {
    const resp_data = {
      boards: [{title: "test"}],
      pagination: {
        per: 20,
        total: 1,
        current: 1,
        next: null,
        prev: null,
      }
    }
    const category_id = 1
    nock(host)
      .get(`/boards?per=10&page=1&category_id=${category_id}`)
      .reply(200, resp_data)
    const expectedActions = [{
      type: types.GET_POPULAR_BOARDS,
      boards: resp_data.boards,
    }]
    const store = mockStore()
    return store.dispatch(actions.getPopularBoardsAsync(category_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get popular boards async failure', () => {
    const category_id = 1
    nock(host)
      .get(`/boards?per=10&page=1&category_id=${category_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore()
    return store.dispatch(actions.getPopularBoardsAsync(category_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get popular comments async success', () => {
    const comments = [{
      id: 1,
      name: 'no name',
      content: 'content'
    }]
    const category_id = 1
    nock(host)
      .get(`/comments/popular?category_id=${category_id}`)
      .reply(200, comments)
    const expectedActions = [{
      type: types.GET_POPULAR_COMMENTS,
      comments: comments,
    }]
    const store = mockStore()
    return store.dispatch(actions.getPopularCommentsAsync(category_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get popular comments async failure', () => {
    const category_id = 1
    nock(host)
      .get(`/comments/popular?category_id=${category_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore()
    return store.dispatch(actions.getPopularCommentsAsync(category_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
