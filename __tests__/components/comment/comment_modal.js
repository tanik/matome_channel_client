import React from 'react'
import { shallow } from 'enzyme'
import { Modal } from 'react-bootstrap';
import CommentModal from '../../../src/js/components/comment/comment_modal'
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
const related_comments = [{
  "id":5332,
  "user_id":4,
  "board_id":90,
  "num":1,
  "name":"名無しさん",
  "content":"てすつ",
  "created_at":"2017-06-21T19:16:24.000Z",
  "hash_id":"tNoIJYopEjjMmF/r",
  "websites":[],
  "images":[],
  "favorite_user_ids":[4]
}]

function setup(comment={},related_comments=[],show=false) {
  const props = {
    show: show,
    comment: comment,
    related_comments: related_comments,
    open: jest.fn(),
    close: jest.fn(),
    changeComments: jest.fn(),
    getRelatedCommentsAsync: jest.fn(),
    getCommentsByNumAsync: jest.fn(),
    favorite: jest.fn(),
    reply: jest.fn(),
    showCommentModal: jest.fn(),
  }
  const wrapper = shallow(
    <CommentModal {...props} />
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('CommentModal', () => {
    it("should render page", () => {
      const { wrapper, props } = setup(comment, related_comments)
      expect(wrapper.find('Comment').length).toEqual(2)
    })
    it("should render progressbar when comment is empty", () => {
      const { wrapper, props } = setup()
      expect(wrapper.find('ProgressBar').length).toEqual(1)
    })
  })
})
