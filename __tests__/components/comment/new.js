import React from 'react'
import { mount, shallow } from 'enzyme'
import { Modal } from 'react-bootstrap';
import NewComment from '../../../src/js/components/comment/new'
import '../../../__mock__/localstrage'

const comment = {
  "id":5335,
  "user_id":4,
  "board_id":90,
  "num":4,
  "name":"名無しさん",
  "content":">>1\nなんだこれは\nhttp://mmoloda.com/pso2/image/105658.jpg",
  "created_at":"2017-06-21T19:18:58.000Z",
  "hash_id":"tNoIJYopEjjMmF/r",
  "websites":[{
    "id":1,
    "title": "Example",
    "full_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websutes/images/1.jpeg",
    "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websutes/thumbnails/1.jpeg",
  }],
  "images":[{
    "id":35,
    "full_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/images/35.jpeg",
    "thumbnail_url":"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/35.jpeg",
    "width":1600,
    "height":900
  }],
  "favorite_user_ids":[]
}

function shallow_setup(board_id=1,content='',show=false) {
  const props = {
    show: show,
    content: content,
    openNewCommentModal: jest.fn(),
    closeNewCommentModal: jest.fn(),
    postComment: jest.fn(),
    board_id: board_id,
  }
  const wrapper = shallow(
    <NewComment {...props} />
  )

  return {
    props,
    wrapper
  }
}

function setup(board_id=1,content='',show=true) {
  const props = {
    show: show,
    content: content,
    openNewCommentModal: jest.fn(),
    closeNewCommentModal: jest.fn(),
    postComment: jest.fn(),
    board_id: board_id,
  }
  const wrapper = mount(
    <NewComment {...props} />
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('NewComment', () => {
    it("should render page", () => {
      const { wrapper, props } = shallow_setup()
      expect(wrapper.find('Modal').length).toEqual(1)
    })
    describe('componentDidUpdate', () => {
      it("should call setState when content changed", () => {
        const { wrapper, props } = setup()
        const instance = wrapper.find(NewComment).node
        const prevProps = Object.assign({}, props)
        prevProps.content = 'a'
        instance.setState = jest.fn()
        instance.componentDidUpdate(prevProps)
        expect(instance.setState.mock.calls[0]).toEqual([{content: ''}])
      })
    })
    describe('close', () => {
      it("should call setState and closeNewCommentModal", () => {
        const { wrapper, props } = setup()
        const instance = wrapper.find(NewComment).node
        instance.setState = jest.fn()
        instance.close()
        expect(instance.setState.mock.calls[0]).toEqual([{content: ''}])
        expect(props.closeNewCommentModal.mock.calls.length).toBe(1)
      })
    })
    describe('post', () => {
      it("should call setState and when content is not empty", () => {
        const { wrapper, props } = setup()
        const instance = wrapper.find(NewComment).node
        instance.comment_name = { value: 'name' }
        instance.comment_content = { value: 'content' }
        instance.post({preventDefault: jest.fn()})
        expect(props.postComment.mock.calls[0]).toEqual([props.board_id, 'name', 'content'])
      })
      it("should call setState and when content is empty", () => {
        const { wrapper, props } = setup()
        const instance = wrapper.find(NewComment).node
        instance.comment_name = { value: '' }
        instance.comment_content = { value: '' }
        instance.post({preventDefault: jest.fn()})
        expect(props.postComment.mock.calls.length).toBe(0)
      })
    })
    describe('handleContentChange', () => {
      it("should call setState", () => {
        const { wrapper, props } = setup()
        const instance = wrapper.find(NewComment).node
        instance.setState = jest.fn()
        instance.handleContentChange({target: {value: 'a'}})
        expect(instance.setState.mock.calls[0]).toEqual([{content: 'a'}])
      })
    })
  })
})
