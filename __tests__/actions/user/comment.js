import * as actions from '../../../src/js/actions/user/comment'
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
  ['comments', 'favorite_comments'].forEach( (item_type) => {
    it(`should create an action to get my ${item_type} async success`, () => {
      const resp_data = {
        comments: [{id: 1, name: "test name", content: "test content"}],
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
      nock(host)
        .get(`/my/${item_type}?page=${page}&per=${per}`)
        .reply(200, resp_data)
      const expectedActions = [{
        type: types.GET_MY_COMMENTS,
        comments: resp_data.comments,
        pagination: resp_data.pagination,
      }]
      const store = mockStore()
      return store.dispatch(actions.getMyCommentsAsync(item_type, page, per)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it(`should create an action to get my ${item_type} async failure`, () => {
      const page = 1
      const per = 20
      nock(host)
        .get(`/my/${item_type}?page=${page}&per=${per}`)
        .reply(500)
      const expectedActions = [{
        type: types.SET_ERRORS,
        errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
      }]
      const store = mockStore()
      return store.dispatch(actions.getMyCommentsAsync(item_type, page, per)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
