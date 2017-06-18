import * as actions from '../../../src/js/actions/user/login'
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
    const email = 'test@test.com'
    const password = 'password'
    const response = {
      data: {
        id: 1,
        email: email,
      }
    }
    const auth_info = {
      'access-token': 'ACCESS-TOKEN-XXXXXX',
      'uid': email,
      'client': 'client-xxxxxxx',
      'expiry': 1497792365
    }
    nock(host)
      .post(`/auth/sign_in`)
      .reply(200, response, auth_info)
    const expectedActions = [{
      type: types.SET_AUTH,
      auth: auth_info,
    },{
      type: types.SET_AUTH,
      auth: {user_id: response.data.id},
    },{
      type: types.LOGIN_SUCCESS,
      response,
    },{
      type: types.SET_NOTICES,
      notices: ['ログインしました！'],
    }]
    const store = mockStore({})
    return store.dispatch(actions.loginAsync(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to login async failure', () => {
    const email = 'test@test.com'
    const password = 'password'
    const response = {
      errors: "ログイン用の認証情報が正しくありません。再度お試しください。"
    }
    nock(host)
      .post(`/auth/sign_in`)
      .reply(401, response)
    const expectedActions = [{
      type: types.SET_AUTH,
      auth: {},
    },{
      type: types.LOGIN_FAILURE,
      response,
    },{
      type: types.SET_ERRORS,
      errors: response.errors,
    }]
    const store = mockStore({})
    return store.dispatch(actions.loginAsync(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
