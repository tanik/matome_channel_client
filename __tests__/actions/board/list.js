import * as actions from '../../../src/js/actions/board/list'
import * as types from '../../../src/js/constants/action_types'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const host = "http://localhost:3000"
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

describe('actions', () => {
  it('should create an action to get boards', () => {
    const boards = [{title: "test"}]
    const page = 1
    const per = 20
    const category_id = 1
    nock(host)
      .get(`/boards?page=${page}&per=${per}&category_id=${category_id}`)
      .reply(200, boards)
    const expectedActions = [{
      type: types.GET_BOARD_LIST,
      page, per, category_id, boards
    }]
    const store = mockStore({ boards: [] })
    return store.dispatch(actions.getBoardsAsync(page, per, category_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

