import * as actions from '../../../src/js/actions/board/show'
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
  it('should create an action to get board async', () => {
    const board_id = 1
    const board = {title: "test"}
    nock(host)
      .get(`/boards/${board_id}`)
      .reply(200, board)
    const expectedActions = [{
      type: types.GET_BOARD,
      board
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getBoardAsync(board_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to add comment', () => {
    const comment = {name: "test", content: "test content"}
    const expectedAction = {
      type: types.ADD_COMMENT,
      comment
    }
    expect(actions.addComment(comment)).toEqual(expectedAction)
  })
})
