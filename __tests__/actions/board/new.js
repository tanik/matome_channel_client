import * as actions from '../../../src/js/actions/board/new'
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
  it('should create an action to post board success', () => {
    const title = 'test'
    const content = 'test content'
    const category_id = 1
    const name=''
    const resp_data = {
      id: 1,
      category_id: category_id,
      title: "test",
      score: 100,
      res_count: 1,
      fav_count: 0,
      thumbnail_url: 'http://img.m-ch.xyz/images/thumbnails/1.png',
      first_comment: content
    }
    nock(host)
      .post(`/boards`)
      .reply(201, resp_data)
    const expectedActions = [{
      type: types.POST_BOARD_SUCCESS,
      response: resp_data,
    }]
    const store = mockStore({})
    return store.dispatch(actions.postBoardAsync(category_id, title,  name, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to post board failure', () => {
    const title = 'test'
    const content = 'test content'
    const category_id = 1
    const name=''
    const errors = {
      title: ['は1文字以上で入力してください'],
      "comments.content": ['は1文字以上で入力してください'],
    }
    const error_messages = [
      'タイトルは1文字以上で入力してください',
      'コメントは1文字以上で入力してください',
    ]
    nock(host)
      .post(`/boards`)
      .reply(422, errors)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: error_messages,
    },{
      type: types.POST_BOARD_FAILURE,
      error: errors,
    }]
    const store = mockStore({})
    return store.dispatch(actions.postBoardAsync(category_id, title,  name, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  it('should create an action to set new board categories', () => {
    const categories = [{
      id: 1,
      name: "test",
      parent_id: null,
    }]
    const expectedAction = {
      type: types.SET_NEW_BOARD_CATEGORIES,
      categories: categories,
    }
    expect(actions.setNewBoardCategories(categories)).toEqual(expectedAction)
  })
  it('should create an action to open new board modal', () => {
    const expectedAction = {
      type: types.OPEN_NEW_BOARD_MODAL,
    }
    expect(actions.openNewBoardModal()).toEqual(expectedAction)
  })
  it('should create an action to close new board modal', () => {
    const expectedAction = {
      type: types.CLOSE_NEW_BOARD_MODAL,
    }
    expect(actions.closeNewBoardModal()).toEqual(expectedAction)
  })
})
