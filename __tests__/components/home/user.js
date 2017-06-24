import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import UserHome from '../../../src/js/components/home/user'
import BoardCable from '../../../src/js/cable/board'
import '../../../__mock__/localstrage'


const categories = [{
  id: 1,
  parent_id: null,
  name: "test",
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
    "score":17,
    "res_count":4,
    "fav_count":1,
    "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/35.jpeg",
    "first_comment":"てすつ"
  }
}]

const populars = [{
  "id":5334,
  "user_id":4,
  "board_id":90,
  "num":3,
  "name":"名無しさん",
  "content":"勉強せねばならぬ・・\n\nhttps://developer.android.com/index.html",
  "created_at":"2017-06-21T19:17:21.000Z",
  "hash_id":"tNoIJYopEjjMmF/r",
  "websites":[{
    "id":37,
    "title":"Android デベロッパー | Android Developers",
    "original_url":"https://developer.android.com/index.html",
    "full_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/images/37.png",
    "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/thumbnails/37.png"
  }],
  "images":[],
  "favorite_user_ids":[4],
  "board":{"id":90,
    "title":"ふーむ",
    "score":17,
    "res_count":4,
    "fav_count":1,
    "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/35.jpeg",
    "first_comment":"てすつ"
  }
}]

const histories = [{
  "id":78,
  "title":"test",
  "score":1,
  "res_count":1,
  "fav_count":0,
  "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/statics/placeholder.png",
  "first_comment":"test"
}]

function setup(comments=[], populars=[], recommends=[], histories=[], loading=true, has_more_comments=true) {
  const props = {
    loading: loading,
    has_more_comments: has_more_comments,
    comments: comments,
    populars: populars,
    recommends: recommends,
    histories: histories,
    getMypageInfomations: jest.fn(),
    addComment: jest.fn(),
    addCommentImage: jest.fn(),
    addCommentWebsite: jest.fn(),
    changeFavoriteComment: jest.fn(),
    getMoreComments: jest.fn(),
  }
  BoardCable.prototype.subscribe = jest.fn()
  const store = require("../../../src/js/stores/store_dev").store
  login()
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <UserHome {...props} />
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

describe('components', () => {
  describe('UserHome', () => {
    it("should render progress bar when loading", () => {
      const { wrapper, props } = setup()
      expect(wrapper.find('h3').at(0).text()).toEqual('test@example.comさんのページ')
      expect(wrapper.find('ProgressBar').length).toEqual(1)
    })

    it("should render all content when all items is empty", () => {
      const { wrapper, props } = setup([],[],[],[],false)
      expect(wrapper.find('h4').at(0).text()).toEqual('タイムラインはまだ空みたいです…。')
      expect(wrapper.find('Panel').at(0).text()).toEqual('話題のコメント話題のコメントはないみたいです…')
      expect(wrapper.find('Panel').at(1).text()).toEqual('スレッドの閲覧履歴閲覧履歴はないみたいです…')
    })

    it("should render all content when all items is not empty", () => {
      const { wrapper, props } = setup(comments,populars,[],histories,false)
      expect(wrapper.find('.home-user-timeline Comment').length).toEqual(1)
      expect(wrapper.find('Panel Comment').length).toEqual(1)
      expect(wrapper.find('.home-user-histories li').at(0).text()).toEqual(histories[0]['title'])
    })

    describe('componentWillUnmount', () => {
      it("should call sub.unsubscribe", () => {
        const { wrapper, props } = setup(comments,populars,[],histories,false)
        const instance = wrapper.find('UserHome').node
        instance.sub = {
          unsubscribe: jest.fn()
        }
        instance.componentWillUnmount()
        expect(instance.sub.unsubscribe.mock.calls.length).toBe(1)
      })
    })

    describe('cable_dispather', () => {
      it("should call addComment when comment_added received", () => {
        const { wrapper, props } = setup(comments,populars,[],histories,false)
        const instance = wrapper.find('UserHome').node
        const data = {
          action: "comment_added",
          comment: {
            id: 1,
            name: 'name',
            content: 'content'
          }
        }
        instance.cable_dispather(data)
        expect(props.addComment.mock.calls[0]).toEqual([data.comment])
      })
      it("should call addCommentImage when comment_image_added received", () => {
        const { wrapper, props } = setup(comments,populars,[],histories,false)
        const instance = wrapper.find('UserHome').node
        const data = {
          action: "comment_image_added",
          comment_image: {
            id:35,
            full_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/images/35.jpeg",
            thumbnail_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/35.jpeg",
            width:1600,
            height:900
          }
        }
        instance.cable_dispather(data)
        expect(props.addCommentImage.mock.calls[0]).toEqual([data.comment_image])
      })
      it("should call addCommentWebsite when comment_website_added received", () => {
        const { wrapper, props } = setup(comments,populars,[],histories,false)
        const instance = wrapper.find('UserHome').node
        const data = {
          action: "comment_website_added",
          comment_website: {
            id:37,
            title:"Android デベロッパー | Android Developers",
            original_url:"https://developer.android.com/index.html",
            full_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/images/37.png",
            thumbnail_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/thumbnails/37.png"
          }
        }
        instance.cable_dispather(data)
        expect(props.addCommentWebsite.mock.calls[0]).toEqual([data.comment_website])
      })
      it("should call changeFavoriteComment when comment_favorited received", () => {
        const { wrapper, props } = setup(comments,populars,[],histories,false)
        const instance = wrapper.find('UserHome').node
        const data = {
          action: "comment_favorited",
          favorite: {
            id:1,
            user_id:1,
            comment_id:1,
          }
        }
        instance.cable_dispather(data)
        expect(props.changeFavoriteComment.mock.calls[0]).toEqual([data.favorite])
      })
      it("should call console.warn when unknown action received", () => {
        const { wrapper, props } = setup(comments,populars,[],histories,false)
        const instance = wrapper.find('UserHome').node
        const data = {
          action: "unknown_action",
        }
        const tmp_warn = console.warn
        console.warn = jest.fn()
        instance.cable_dispather(data)
        expect(console.warn.mock.calls[0]).toEqual(["unknown action: ", data])
        console.warn = tmp_warn
      })
    })

    describe('getMoreComments', () => {
      it("should call getMoreComments", () => {
        const { wrapper, props } = setup(comments,populars,[],histories,false)
        const instance = wrapper.find('UserHome').node
        instance.getMoreComments()
        expect(props.getMoreComments.mock.calls[0]).toEqual([comments[0].id])
      })
    })
  })
})
