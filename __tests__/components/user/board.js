import React from 'react'
import { mount, shallow} from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import MyBoards from '../../../src/js/components/user/board'
import '../../../__mock__/localstrage'

const boards = [{
  "id":78,
  "title":"test",
  "score":1,
  "res_count":1,
  "fav_count":0,
  "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/statics/placeholder.png",
  "first_comment":"test"
}]

const pagination = {
  page: 1,
  per: 10,
  total_page: 1,
  next_page: null,
  prev_page: null,
}

function setup(type='boards', boards=[], pagination={}) {
  pagination.page || (pagination.page = 1)
  pagination.per || (pagination.per = 10)
  pagination.total_page || (pagination.total_page = 1)
  pagination.next_page || (pagination.next_page = null)
  pagination.prev_page || (pagination.prev_page = null)

  const props = {
    type: type,
    boards: boards,
    page: pagination.page,
    per: pagination.per,
    total_page: pagination.total_page,
    next_page: pagination.next_page,
    prev_page: pagination.prev_page,
    getMyBoards: jest.fn(),
  }

  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <MyBoards {...props} />
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
  describe('MyBoards', () => {
    it('should redirect to login page when not authorized', () => {
      logout()
      const { wrapper, props } = setup('boards', boards, pagination)
      expect(wrapper.find('Redirect').length).toBe(1)
      expect(wrapper.find('Redirect').props().to).toEqual('/login')
      expect(props.getMyBoards.mock.calls.length).toBe(0)
    })

    it('should render my boards', () => {
      login()
      const { wrapper, props } = setup('boards', boards, pagination)
      expect(wrapper.find('h2').text()).toEqual('作成スレッド一覧')
      expect(wrapper.find('Board').length).toBe(1)
      expect(props.getMyBoards.mock.calls[0]).toEqual([props.type, props.page, props.per])
    })

    it('should render my favorite boards', () => {
      login()
      const { wrapper, props } = setup('favorite_boards', boards, pagination)
      expect(wrapper.find('h2').text()).toEqual('お気に入りスレッド一覧')
      expect(wrapper.find('Board').length).toBe(1)
      expect(props.getMyBoards.mock.calls[0]).toEqual([props.type, props.page, props.per])
    })

    it('should render my histories', () => {
      login()
      const { wrapper, props } = setup('histories', boards, pagination)
      expect(wrapper.find('h2').text()).toEqual('スレッド閲覧履歴')
      expect(wrapper.find('Board').length).toBe(1)
      expect(props.getMyBoards.mock.calls[0]).toEqual([props.type, props.page, props.per])
    })
    describe('changePage', () => {
      it('should call getMyBoards', () => {
        login()
        const { wrapper, props } = setup('boards', boards, pagination)
        const instance = wrapper.find('MyBoards').node
        instance.changePage(2)
        expect(props.getMyBoards.mock.calls[0]).toEqual([props.type, props.page, props.per])
        expect(props.getMyBoards.mock.calls[1]).toEqual([props.type, 2, props.per])
      })
    })
  })
})
