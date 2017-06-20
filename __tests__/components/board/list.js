import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import BoardList from '../../../src/js/components/board/list'
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

function setup(boards=[], pagination={}, pathname='/boards', category_id=undefined) {
  pagination = {
    page: (pagination.page || 1),
    per: (pagination.per || 20),
    total_page: (pagination.total_page || 1),
    next_page: pagination.next_page,
    prev_page: pagination.prev_page,
  }
  const props = {
    match: {
      params: {
        id: category_id,
        query: null,
      },
    },
    location: {
      pathname: pathname
    },
    boards: boards,
    page: pagination.page,
    per: pagination.per,
    total_page: pagination.total_page,
    next_page: pagination.next_page,
    prev_page: pagination.prev_page,
    getBoards: jest.fn(),
    openNewBoardModal: jest.fn(),
  }
  const context = {}
  const store = require("../../../src/js/stores/store_dev").store
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <BoardList {...props} />
      </BrowserRouter>
    </Provider>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('BoardList', () => {
    it('should render board list page', () => {
      nock(host)
        .get('/categories')
        .reply(200, categories)
      const { wrapper, props } = setup(boards, {})
      expect(wrapper.find('.board-title h2').text()).toEqual('スレッド一覧')
      expect(props.getBoards.mock.calls[0]).toEqual([1, 20, 0, null])
    })

    it('should render board list page when category selected', () => {
      nock(host)
        .get('/categories')
        .reply(200, categories)
      const { wrapper, props } = setup(boards, {}, '/categories/1/boards', 1)
      expect(wrapper.find('.board-title h2').text()).toEqual('スレッド一覧')
    })

    it('should render board list page', () => {
      nock(host)
        .get('/categories')
        .reply(200, categories)
      const { wrapper, props } = setup(boards, {})
      wrapper.find('Pagination').props().onSelect(2)
      expect(props.getBoards.mock.calls[1]).toEqual([2, 20, 0, null])
    })

    it('should render boards when category changed', () => {
      nock(host)
        .get('/categories')
        .reply(200, categories)
      const { wrapper, props } = setup(boards, {})
      wrapper.update()
      expect(props.getBoards.mock.calls[0]).toEqual([1, 20, 0, null])
    })
  })
})
