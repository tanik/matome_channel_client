import * as actions from '../../../src/js/actions/category/list'
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
  it('should create an action to get category list async success', () => {
    const categories = [{name: "test"}]
    nock(host)
      .get('/categories')
      .reply(200, categories)
    const expectedActions = [{
      type: types.GET_CATEGORIES,
      categories
    },{
      type: types.SET_NEW_BOARD_CATEGORIES,
      categories
    }]
    const store = mockStore()
    return store.dispatch(actions.getCategoriesAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get category list async failure', () => {
    nock(host)
      .get('/categories')
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore()
    return store.dispatch(actions.getCategoriesAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to change category', () => {
    const category_id = 1
    const expectedAction = {
      type: types.CHANGE_CATEGORY,
      category_id
    }
    expect(actions.changeCategory(category_id)).toEqual(expectedAction)
  })
})
