import * as actions from '../../src/js/actions/contact'
import * as types from '../../src/js/constants/action_types'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import '../../__mock__/localstrage'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const host = APP_CONFIG.API_BASE

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

console.error = () => {}

describe('actions', () => {
  it('should create an action to set contact errors', () => {
    const errors = {
      email: ['は1文字以上で入力してください'],
      content: ['は1文字以上で入力してください'],
    }
    const error_messages = [
      'メールアドレスは1文字以上で入力してください',
      'お問い合わせ内容は1文字以上で入力してください',
    ]
    const expectedActions = [{
      type: types.SET_CONTACT_ERRORS,
      errors: errors,
    },{
      type: types.SET_ERRORS,
      errors: error_messages,
    }]
    const store = mockStore()
    return store.dispatch(actions.setContactErrors(errors)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to post contact async success', () => {
    const email = "test@test.com"
    const content = "test content"
    nock(host)
      .post(`/contacts`)
      .reply(201)
    const expectedActions = [{
      type: types.POST_CONTACT_SUCCESS,
    },{
      type: types.SET_NOTICES,
      notices: ["送信完了しました！"],
    }]
    const store = mockStore()
    return store.dispatch(actions.postContactAsync(email, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to post contact async failure', () => {
    const email = "test@test.com"
    const content = "test content"
    const errors = {
      email: ['は1文字以上で入力してください'],
      content: ['は1文字以上で入力してください'],
    }
    const error_messages = [
      'メールアドレスは1文字以上で入力してください',
      'お問い合わせ内容は1文字以上で入力してください',
    ]
    nock(host)
      .post(`/contacts`)
      .reply(422, errors)
    const expectedActions = [{
      type: types.SET_CONTACT_ERRORS,
      errors: errors,
    },{
      type: types.SET_ERRORS,
      errors: error_messages,
    }]
    const store = mockStore()
    return store.dispatch(actions.postContactAsync(email, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
