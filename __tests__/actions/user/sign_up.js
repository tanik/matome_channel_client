import * as actions from '../../../src/js/actions/user/sign_up'
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
      .post(`/auth`)
      .reply(200, response, auth_info)
    const expectedActions = [{
      type: types.SET_AUTH,
      auth: auth_info,
    },{
      type: types.SET_AUTH,
      auth: {user_id: response.data.id},
    },{
      type: types.SIGN_UP_SUCCESS,
      response,
    },{
      type: types.SET_NOTICES,
      notices: ['ユーザ登録が完了しました！'],
    }]
    const store = mockStore({})
    return store.dispatch(actions.signUpAsync(email, password, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to login async failure', () => {
    const email = 'test@test.com'
    const password = 'password'
    const response = {
      "status":"error",
      "data":{
        "id":null,
        "provider":"email",
        "uid":"",
        "name":null,
        "nickname":null,
        "image":null,
        "email":email,
        "created_at":null,
        "updated_at":null
      },
      "errors":{
        "password_confirmation":["とパスワードの入力が一致しません"],
        "password":["は6文字以上で入力してください"],
        "email":["はメールアドレスではありません"],
        "full_messages":[
          "確認用パスワードとパスワードの入力が一致しません",
          "パスワードは6文字以上で入力してください",
          "メールアドレスはメールアドレスではありません"
        ]
      }
    }
    nock(host)
      .post(`/auth`)
      .reply(422, response)
    const expectedActions = [{
      type: types.SIGN_UP_FAILURE,
      response,
    },{
      type: types.SET_ERRORS,
      errors: response.errors.full_messages,
    }]
    const store = mockStore({})
    return store.dispatch(actions.signUpAsync(email, password, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
