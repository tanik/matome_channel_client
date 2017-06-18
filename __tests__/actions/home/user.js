import * as actions from '../../../src/js/actions/home/user'
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
  it('should create an action to get mypage infomations async success', () => {
    const resp_data = {
      comments: [],
      populars: [],
      recommends: [],
      histories: [],
    }
    const category_id = 1
    nock(host)
      .get(`/my`)
      .reply(200, resp_data)
    const expectedActions = [{
      type: types.SET_MYPAGE_LOADING,
      loading: true,
    },{
      type: types.SET_MYPAGE_LOADING,
      loading: false,
    },{
      type: types.GET_MYPAGE_INFO,
      data: resp_data,
    }]
    const store = mockStore()
    return store.dispatch(actions.getMypageInfomationsAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get mypage infomations async failure', () => {
    const category_id = 1
    nock(host)
      .get(`/boards?per=10&page=1&category_id=${category_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_MYPAGE_LOADING,
      loading: true,
    },{
      type: types.SET_MYPAGE_LOADING,
      loading: false,
    },{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore()
    return store.dispatch(actions.getMypageInfomationsAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get more comments async success', () => {
    const comments = [{
      id: 1,
      name: '',
      content: '',
    }]
    const lt_id = 1
    nock(host)
      .get(`/my/timeline_comments?lt_id=${lt_id}`)
      .reply(200, comments)
    const expectedActions = [{
      type: types.GET_MORE_COMMENTS_ON_TL,
      comments: comments,
    }]
    const store = mockStore()
    return store.dispatch(actions.getMoreCommentsAsync(lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get more comments async failure', () => {
    const lt_id = 1
    nock(host)
      .get(`/my/timeline_comments?lt_id=${lt_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore()
    return store.dispatch(actions.getMoreCommentsAsync(lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to add comment on timeline', () => {
    const comment = {
      id: 1,
      name: '',
      content: '',
    }
    const expectedActions = {
      type: types.ADD_COMMENT_ON_TL,
      comment: comment,
    }
    expect(actions.addCommentOnTimeline(comment)).toEqual(expectedActions)
  })

  it('should create an action to add comment image on timeline', () => {
    const comment_image = {
      id: 1,
      comment_id: 1,
      image_id: 1,
    }
    const expectedActions = {
      type: types.ADD_COMMENT_IMAGE_ON_TL,
      comment_image,
    }
    expect(actions.addCommentImageOnTimeline(comment_image)).toEqual(expectedActions)
  })

  it('should create an action to add comment website on timeline', () => {
    const comment_website = {
      id: 1,
      comment_id: 1,
      website_id: 1,
    }
    const expectedActions = {
      type: types.ADD_COMMENT_WEBSITE_ON_TL,
      comment_website,
    }
    expect(actions.addCommentWebsiteOnTimeline(comment_website)).toEqual(expectedActions)
  })

  it('should create an action to change favorite comment on timeline', () => {
    const favorite = {
      id: 1,
      user_id: 1,
      comment_id: 1,
    }
    const expectedActions = {
      type: types.CHANGE_FAVORITE_COMMENT_ON_TL,
      favorite,
    }
    expect(actions.changeFavoriteCommentOnTimeline(favorite)).toEqual(expectedActions)
  })
})
