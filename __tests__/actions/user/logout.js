import * as actions from '../../../src/js/actions/user/logout'
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
  it('should create an action to login async success', () => {
    const response = {
      success: true
    }
    nock(host)
      .delete(`/auth/sign_out`)
      .reply(200, response)
    const expectedActions = [{
      type: types.SET_AUTH,
      auth: {},
    },{
      type: types.LOGOUT_SUCCESS,
    },{
      type: types.SET_NOTICES,
      notices: ['ログアウトしました！'],
    }]
    const store = mockStore({})
    return store.dispatch(actions.logoutAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to login async failure', () => {
    nock(host)
      .delete(`/auth/sign_out`)
      .reply(401)
    const expectedActions = [{
      type: types.SET_AUTH,
      auth: {},
    },{
      type: types.LOGOUT_FAILURE,
    },{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらくお待ちいただいてから再度リトライしてください。"],
    }]
    const store = mockStore({})
    return store.dispatch(actions.logoutAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
