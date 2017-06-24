import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import GuestHome from '../../../src/js/components/home/guest'
import '../../../__mock__/localstrage'
import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

const host = APP_CONFIG.API_BASE
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const categories = [{
  id: 1,
  parent_id: null,
  name: "test",
}]


const boards = [{
  "id":78,
  "title":"test",
  "score":1,
  "res_count":1,
  "fav_count":0,
  "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/statics/placeholder.png",
  "first_comment":"test"
}]

const comments =[{
  "id":5335,
  "user_id":4,
  "board_id":90,
  "num":4,
  "name":"名無しさん",
  "content":"なんだこれは\nhttp://mmoloda.com/pso2/image/105658.jpg",
  "created_at":"2017-06-21T19:18:58.000Z",
  "hash_id":"tNoIJYopEjjMmF/r",
  "websites":[],
  "images":[{
    "id":35,
    "full_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/images/35.jpeg",
    "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/35.jpeg",
    "width":1600,
    "height":900
  }],
  "favorite_user_ids":[],
  "board":{
    "id":90,
    "title":"ふーむ",
    "score":57,
    "res_count":4,
    "fav_count":1,
    "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/35.jpeg",
    "first_comment":"てすつ"
  }
}]

function setup(boards=[], comments=[], selected_category_id=undefined) {
  const path = selected_category_id ? `/categories/${selected_category_id}` : ''
  const props = {
    match: {
      params:{
        id: selected_category_id,
      },
      url: path,
    },
    location: {
      pathname: path,
    },
    history: {
      push: jest.fn(),
    },
    boards: boards,
    comments: comments,
    getPopularBoards: jest.fn(),
    getPopularComments: jest.fn(),
  }
  nock(host)
    .get('/categories')
    .reply(200, categories)
  const store = require("../../../src/js/stores/store_dev").store
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <GuestHome {...props} />
      </BrowserRouter>
    </Provider>
  )

  return {
    props,
    wrapper
  }
}

function login(){
  window.localStorage.setItem('auth', JSON.stringify({
    auth: {
      'access-token': 'aaaaaaaaa',
      'client': 'bbbbbbbbb',
      'uid': 'test@example.com',
      'expiry': 1497951304,
      'user_id': 1,
    }
  }))
}

function logout(){
  window.localStorage.setItem('auth', JSON.stringify({
    auth: {}
  }))
}

describe('components', () => {
  describe('GuestHome', () => {
    it("should render GuestHome when boards and comments are empty", () => {
      const { wrapper, props } = setup()
      expect(wrapper.find('h4').at(0).text()).toEqual('話題のコメントはないみたいです…')
      expect(wrapper.find('h4').at(1).text()).toEqual('話題のスレッドはないみたいです…')
    })

    it("should render GuestHome when not sign in", () => {
      const { wrapper, props } = setup(boards, comments)
      expect(wrapper.find('Board').length).toBe(2)
      expect(wrapper.find('Comment').length).toBe(1)
    })

    describe('componentDidUpdate', () => {
      it("should call getPopularBoards and getPopularComments", () => {
        const { wrapper, props } = setup(boards, comments, 1)
        const instance = wrapper.find(GuestHome).node
        const prevProps = {
          location: {
            pathname: '/categories/2'
          }
        }
        instance.componentDidUpdate(prevProps)
        expect(props.getPopularBoards.mock.calls[1]).toEqual([1])
        expect(props.getPopularComments.mock.calls[1]).toEqual([1])
      })
    })
  })
})
