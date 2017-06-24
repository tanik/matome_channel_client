import React from 'react'
import { mount, shallow} from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import MyComments from '../../../src/js/components/user/comment'
import '../../../__mock__/localstrage'

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

const pagination = {
  page: 1,
  per: 10,
  total_page: 1,
  next_page: null,
  prev_page: null,
}

function setup(type='comments', comments=[], pagination={}) {
  pagination.page || (pagination.page = 1)
  pagination.per || (pagination.per = 10)
  pagination.total_page || (pagination.total_page = 1)
  pagination.next_page || (pagination.next_page = null)
  pagination.prev_page || (pagination.prev_page = null)

  const props = {
    type: type,
    comments: comments,
    page: pagination.page,
    per: pagination.per,
    total_page: pagination.total_page,
    next_page: pagination.next_page,
    prev_page: pagination.prev_page,
    getMyComments: jest.fn(),
  }

  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <MyComments {...props} />
    </StaticRouter>
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
    auth: {
      'access-token': '',
      'client': '',
      'uid': '',
      'expiry': 0,
      'user_id': null,
    }
  }))
}


describe('components', () => {
  describe('MyComments', () => {
    it('should redirect to login page when not authorized', () => {
      logout()
      const { wrapper, props } = setup('comments', comments, pagination)
      expect(wrapper.find('Redirect').length).toBe(1)
      expect(wrapper.find('Redirect').props().to).toEqual('/login')
      expect(props.getMyComments.mock.calls.length).toBe(0)
    })

    it('should render my comments', () => {
      login()
      const { wrapper, props } = setup('comments', comments, pagination)
      expect(wrapper.find('h2').text()).toEqual('書き込みコメント一覧')
      expect(wrapper.find('Comment').length).toBe(1)
      expect(props.getMyComments.mock.calls[0]).toEqual([props.type, props.page, props.per])
    })

    it('should render my favorite comments', () => {
      login()
      const { wrapper, props } = setup('favorite_comments', comments, pagination)
      expect(wrapper.find('h2').text()).toEqual('お気に入りコメント一覧')
      expect(wrapper.find('Comment').length).toBe(1)
      expect(props.getMyComments.mock.calls[0]).toEqual([props.type, props.page, props.per])
    })


    describe('changePage', () => {
      it('should call getMyComments', () => {
        login()
        const { wrapper, props } = setup('comments', comments, pagination)
        const instance = wrapper.find('MyComments').node
        instance.changePage(2)
        expect(props.getMyComments.mock.calls[0]).toEqual([props.type, props.page, props.per])
        expect(props.getMyComments.mock.calls[1]).toEqual([props.type, 2, props.per])
      })
    })
  })
})
