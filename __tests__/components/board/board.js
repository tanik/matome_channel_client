import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Board from '../../../src/js/components/board/board'
import { StaticRouter } from 'react-router'
import '../../../__mock__/localstrage'

function setup(board={}, content={}) {
  const props = {
    board: board,
    content: content,
  }
  const context = {}
  const wrapper = mount(
    <StaticRouter location="/" context={context}>
      <Board {...props} />
    </StaticRouter>
  )

  return {
    props,
    wrapper
  }
}

const board = {
  id: 78,
  title: "test",
  score: 1,
  res_count: 1,
  fav_count: 0,
  thumbnail_url: "http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/statics/placeholder.png",
  first_comment: "test",
  category_tree: [{
    id: 1,
    parent_id: null,
    name: "社会",
    created_at: '2017-05-19T09:41:06.000Z',
    updated_at: '2017-05-19T09:41:06.000Z',
  }],
  websites: [],
  images: [],
  favorite_user_ids: [],
  comments: [{
    id: 5298,
    user_id: null,
    board_id: 78,
    num: 1,
    name: "名無しさん",
    content: "test",
    created_at: '2017-05-19T09:41:06.000Z',
    hash_id: "uxTx1SdhP8apDJyX",
    websites: [],
    images: [],
    favorite_user_ids: []
  }]
}

describe('components', () => {
  describe('Board', () => {
    it('should render content with first comment', () => {
      const { wrapper, props } = setup(board, null)
      expect(wrapper.find('.first-comment').text()).toEqual(board.first_comment)
    })

    it('should render content with props content', () => {
      const { wrapper, props } = setup(board, (() => { return(<div className="test">test content</div>) })())
      expect(wrapper.find('.first-comment .test').text()).toEqual('test content')
    })
  })
})
