import * as actions from '../../../src/js/actions/board/show'
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

  it('should create an action to set favorite async', () => {
    const board_id = 1
    const comment_id = 1
    const favorite = {id: 1, user_id: 1, comment_id: 1}
    nock(host)
      .put(`/boards/${board_id}/comments/${comment_id}/favorite`)
      .reply(200, favorite)
    const expectedActions = []
    const store = mockStore({ board: {} })
    return store.dispatch(actions.setFavoriteCommentAsync(board_id, comment_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to change favorite', () => {
    const favorite = {id: 1, user_id: 1, comment_id: 1}
    const expectedAction = {
      type: types.CHANGE_FAVORITE_COMMENT,
      favorite
    }
    expect(actions.changeFavoriteComment(favorite)).toEqual(expectedAction)
  })

})
