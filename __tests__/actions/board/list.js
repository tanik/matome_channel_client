import * as actions from '../../../src/js/actions/board/list'
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
  it('should create an action to get boards success', () => {
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
    const page = 1
    const per = 20
    const category_id = 1
    nock(host)
      .get(`/boards?page=${page}&per=${per}&category_id=${category_id}`)
      .reply(200, resp_data)
    const expectedActions = [{
      type: types.GET_BOARDS,
      category_id: category_id,
      boards: resp_data.boards,
      pagination: resp_data.pagination
    }]
    const store = mockStore({ boards: [] })
    return store.dispatch(actions.getBoardsAsync(page, per, category_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get boards failure', () => {
    const page = 1
    const per = 20
    const category_id = 1
    nock(host)
      .get(`/boards?page=${page}&per=${per}&category_id=${category_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore()
    return store.dispatch(actions.getBoardsAsync(page, per, category_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
