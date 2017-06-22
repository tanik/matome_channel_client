import React from 'react'
import { mount, shallow} from 'enzyme'
import Comment from '../../../src/js/components/comment/comment'
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

function setup(comment={},showOptions=null) {
  const props = {
    showOptions: showOptions,
    comment: comment,
    favorite: jest.fn(),
    reply: jest.fn(),
    showCommentModal: jest.fn(),
  }
  const wrapper = mount(
    <Comment {...props} />
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('Comment', () => {
    it('should render comment with all items', () => {
      const { wrapper, props } = setup(comment)
      expect(wrapper.find('.comment-header-num strong').text()).toEqual(`${comment.num}`)
      expect(wrapper.find('.comment-header-name strong').text()).toEqual(`${comment.name}`)
      expect(wrapper.find('.comment-header-created-at Time').props().value).toEqual(new Date(comment.created_at))
      expect(wrapper.find('.comment-header-hash-id').text()).toEqual(`ID: ${comment.hash_id}`)
      expect(wrapper.find('.interweave a').length).toBe(2)
      expect(wrapper.find('.comment-website-list').find('Thumbnail').props().href).toEqual(comment.websites[0].full_url)
      expect(wrapper.find('.comment-website-list').find('Thumbnail').props().src).toEqual(comment.websites[0].thumbnail_url)
      expect(wrapper.find('.comment-image-list').find('Thumbnail').props().href).toEqual(comment.images[0].full_url)
      expect(wrapper.find('.comment-image-list').find('Thumbnail').props().src).toEqual(comment.images[0].thumbnail_url)
      expect(wrapper.find('.comment-tools-reply').find('Glyphicon').props().glyph).toEqual('share-alt')
      expect(wrapper.find('.comment-tools-favorite').find('Glyphicon').props().glyph).toEqual('heart')
    })

    it('should render content with invalid scheme', () => {
      let invalid_scheme_comment = Object.assign({}, comment)
      invalid_scheme_comment.content = 'ftp://example.com'
      const { wrapper, props } = setup(invalid_scheme_comment)
      expect(wrapper.find('.interweave a').length).toBe(0)
    })

    it('should render comment when show item selected', () => {
      const { wrapper, props } = setup(comment, {})
      expect(wrapper.find('.comment-header-num').length).toBe(0)
      expect(wrapper.find('.comment-header-name').length).toBe(0)
      expect(wrapper.find('.comment-header-created-at').length).toBe(0)
      expect(wrapper.find('.comment-header-hash-id').length).toBe(0)
      expect(wrapper.find('.interweave').length).toBe(1)
      expect(wrapper.find('.comment-image-list').length).toBe(0)
      expect(wrapper.find('.comment-website-list').length).toBe(0)
      expect(wrapper.find('.comment-tools-reply').length).toBe(0)
      expect(wrapper.find('.comment-tools-favorite').length).toBe(0)
    })

    describe('reply', () => {
      it('should call reply with num', () => {
        const { wrapper, props } = setup(comment)
        const instance = wrapper.find('Comment').node
        instance.reply({stopPropagation: jest.fn()})
        expect(props.reply.mock.calls[0]).toEqual([comment.num])
      })
    })

    describe('favorite', () => {
      it('should not call favorite if it is my favarite', () => {
        window.localStorage.setItem('auth', JSON.stringify({
          auth: {
            'access-token': 'aaaaaaaaa',
            'client': 'bbbbbbbbb',
            'uid': 'test@example.com',
            'expiry': 1497951304,
            'user_id': 1,
          }
        }))
        let fav_comment = Object.assign({}, comment)
        fav_comment.favorite_user_ids = [1]
        const { wrapper, props } = setup(fav_comment)
        const instance = wrapper.find('Comment').node
        instance.favorite({stopPropagation: jest.fn()})
        expect(props.favorite.mock.calls.length).toBe(0)
      })
      it('should call favorite with correct arguments', () => {
        const { wrapper, props } = setup(comment)
        const instance = wrapper.find('Comment').node
        instance.favorite({stopPropagation: jest.fn()})
        expect(props.favorite.mock.calls[0]).toEqual([comment.board_id, comment.id])
      })
    })

    describe('showCommentDetail', () => {
      it('should call showCommentModal', () => {
        const { wrapper, props } = setup(comment)
        const instance = wrapper.find('Comment').node
        instance.showCommentDetail()
        expect(props.showCommentModal.mock.calls[0]).toEqual([{comment: comment}])
      })
    })

    describe('handleClickURL', () => {
      it('should call window.open', () => {
        const { wrapper, props } = setup(comment)
        const instance = wrapper.find('Comment').node
        let open = window.open
        window.open = jest.fn()
        instance.handleClickURL({
          target: {href: 'http://example.com'},
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        })
        expect(window.open.mock.calls[0]).toEqual(['http://example.com'])
        window.open = open
      })
    })

    describe('handleClickAnchor', () => {
      it('should call handleClickAnchor', () => {
        const { wrapper, props } = setup(comment)
        const instance = wrapper.find('Comment').node
        instance.handleClickAnchor({
          target: {
            dataset: {
              num: '1',
            }
          },
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        })
        expect(props.showCommentModal.mock.calls[0]).toEqual([{board_id: comment.board_id, num: '1'}])
      })
    })

    describe('handleClickThumbnail', () => {
      it('should call stopPropagation', () => {
        const { wrapper, props } = setup(comment)
        const instance = wrapper.find('Comment').node
        const event = {stopPropagation: jest.fn()}
        instance.handleClickThumbnail(event)
        expect(event.stopPropagation.mock.calls.length).toBe(1)
      })
    })
  })
})
