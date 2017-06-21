import React from 'react'
import { mount, shallow} from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import sinon from 'sinon';
import BoardCable from '../../../src/js/cable/board'
import ShowBoard from '../../../src/js/components/board/show'
import '../../../__mock__/localstrage'

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
  websites: [{
    id: 1,
    board_id:78,
    website:{
      id:36,
      title:"Module: ActionCable — Documentation for rails/rails (master)",
      original_url:"http://www.rubydoc.info/github/rails/rails/ActionCable/",
      full_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/images/36.png",
      thumbnail_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/thumbnails/36.png"
    }
  }],
  images: [{
    id: 1,
    board_id:78,
    image:{
      id:34,
      full_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/images/34.jpeg",
      thumbnail_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/34.jpeg",
      width:512,
      height:288
    }
  }],
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
    websites: [{
      id:36,
      title:"Module: ActionCable — Documentation for rails/rails (master)",
      original_url:"http://www.rubydoc.info/github/rails/rails/ActionCable/",
      full_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/images/36.png",
      thumbnail_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/websites/thumbnails/36.png"
    }],
    images: [{
      id:34,
      full_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/images/34.jpeg",
      thumbnail_url:"http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/images/thumbnails/34.jpeg",
      width:512,
      height:288
    }],
    favorite_user_ids: []
  }]
}

function setup(board={}, url=`/boards/${board.id}`, has_more_websites=false, has_more_images=false) {
  const props = {
    board: board,
    match: {
      params: {
        id: board.id,
      },
      url: url,
    },
    location: {
      pathname: url,
    },
    history: [],
    has_more_websites: has_more_websites,
    has_more_images: has_more_images,
    getBoard: jest.fn(),
    getComments: jest.fn(),
    getWebsites: jest.fn(),
    getImages: jest.fn(),
    setFavoriteBoard: jest.fn(),
    setFavoriteComment: jest.fn(),
    changeFavoriteBoard: jest.fn(),
    changeFavoriteComment: jest.fn(),
    addComment: jest.fn(),
    addBoardImage: jest.fn(),
    addBoardWebsite: jest.fn(),
    addCommentImage: jest.fn(),
    addCommentWebsite: jest.fn(),
    showCommentModal: jest.fn(),
    openNewCommentModal: jest.fn(),
  }
  const context = {}
  BoardCable.prototype.subscribe = jest.fn()
  const store = require("../../../src/js/stores/store_dev").store
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ShowBoard {...props} />
      </BrowserRouter>
    </Provider>
  )

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('ShowBoard', () => {
    it('should render show board when board is empty', () => {
      const { wrapper, props } = setup({}, `/boards/${board.id}`)
      expect(wrapper.find('.board-show-header h3').text()).toEqual("")
    })
    it('should render show board comment page', () => {
      const { wrapper, props } = setup(board, `/boards/${board.id}`)
      expect(wrapper.find('.board-show-header h3').text()).toEqual(board.title)
      expect(wrapper.find('.board-show-body-header li').at(0).props().className).toEqual('active')
      expect(wrapper.find('Comment').length).toEqual(1)
    })
    it('should render show board comment page when comment is empty', () => {
      const empty_comments_board = {
        id: 1,
        title: 'test',
        res_count: 1,
        fav_count: 0,
        thumbnail_url: "http://img-dev.m-ch.xyz.s3-website-ap-northeast-1.amazonaws.com/statics/placeholder.png",
        first_comment: "test",
        images: [],
        websites: [],
        favorite_user_ids: [],
        comments: [],
      }
      const { wrapper, props } = setup(empty_comments_board, `/boards/${empty_comments_board.id}`)
      expect(wrapper.find('.board-show-header h3').text()).toEqual(board.title)
      expect(wrapper.find('.board-show-body-header li').at(0).props().className).toEqual('active')
      expect(wrapper.find('Comment').length).toEqual(0)
      expect(wrapper.find('.board-show-body-content div').at(0).text()).toEqual('コメントがありません。')
    })
    it('should render show board website page', () => {
      const { wrapper, props } = setup(board, `/boards/${board.id}/websites`)
      expect(wrapper.find('.board-show-header h3').text()).toEqual(board.title)
      expect(wrapper.find('.board-show-body-header li').at(1).props().className).toEqual('active')
      expect(wrapper.find('.website-list').length).toEqual(1)
    })
    it('should render show board image page', () => {
      const { wrapper, props } = setup(board, `/boards/${board.id}/images`)
      expect(wrapper.find('.board-show-header h3').text()).toEqual(board.title)
      expect(wrapper.find('.board-show-body-header li').at(2).props().className).toEqual('active')
      expect(wrapper.find('Gallery').length).toEqual(1)
    })
    it('should render show board other page', () => {
      const { wrapper, props } = setup(board, `/boards/${board.id}/other`)
      expect(wrapper.find('.board-show-header h3').text()).toEqual(board.title)
      expect(wrapper.find('.board-show-body h5').text()).toEqual('そんなページはありません！')
    })
    it('should open image when click board image', () => {
      const { wrapper, props } = setup(board, `/boards/${board.id}/images`)
      window.open = jest.fn()
      wrapper.find(ShowBoard).node.openImage(0, {preventDefault: jest.fn()})
      expect(window.open.mock.calls[0][0]).toEqual(board.images[0].image.full_url)
    })
    describe('cable_dispather', () => {
      it('should call addComment when receive comment_added', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "comment_added",
          comment: board.comment,
        })
        expect(props.addComment.mock.calls[0][0]).toEqual(board.comment)
      })
      it('should call addBoardImage when receive board_image_added', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "board_image_added",
          board_image: board.images[0],
        })
        expect(props.addBoardImage.mock.calls[0][0]).toEqual(board.images[0])
      })
      it('should call addBoardWebsite when receive board_website_added', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "board_website_added",
          board_website: board.websites[0],
        })
        expect(props.addBoardWebsite.mock.calls[0][0]).toEqual(board.websites[0])
      })
      it('should call addCommentImage when receive comment_image_added', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "comment_image_added",
          comment_image: board.comments[0].images[0],
        })
        expect(props.addCommentImage.mock.calls[0][0]).toEqual(board.comments[0].images[0])
      })
      it('should call addCommentWebsite when receive comment_website_added', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        window.open = jest.fn()
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "comment_website_added",
          comment_website: board.comments[0].websites[0],
        })
        expect(props.addCommentWebsite.mock.calls[0][0]).toEqual(board.comments[0].websites[0])
      })
      it('should call changeFavoriteComment when receive comment_favorited', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        const favorite = {
          id: 1,
          user_id: 1,
          comment_id: board.comments[0].id
        }
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "comment_favorited",
          favorite,
        })
        expect(props.changeFavoriteComment.mock.calls[0][0]).toEqual(favorite)
      })
      it('should call changeFavoriteComment when receive board_favorited', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        const favorite = {
          id: 1,
          user_id: 1,
          board_id: board.id
        }
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "board_favorited",
          favorite,
        })
        expect(props.changeFavoriteBoard.mock.calls[0][0]).toEqual(favorite)
      })
      it('should show warning when receive unknown action', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        const warn = console.warn
        console.warn = jest.fn()
        wrapper.find(ShowBoard).node.cable_dispather({
          action: "unknown_action",
        })
        expect(console.warn.mock.calls[0]).toEqual(["unknown action: ", {
          action: "unknown_action",
        }])
        console.warn = warn
      })
    })
    describe('openNewComment', () => {
      it('should call openNewCommentModal with empty content', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.openNewComment({preventDefault: jest.fn()})
        expect(props.openNewCommentModal.mock.calls[0]).toEqual([''])
      })
    })
    describe('reply', () => {
      it('should call openNewCommentModal with anthor content', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.reply(1)
        expect(props.openNewCommentModal.mock.calls[0]).toEqual([">>1\n"])
      })
    })
    describe('favoriteComment', () => {
      it('should call favoriteComment when authorized', () => {
        window.localStorage.setItem('auth', JSON.stringify({
          auth: {
            'access-token': 'aaaaaaaaa',
            'client': 'bbbbbbbbb',
            'uid': 'test@example.com',
            'expiry': 1497951304,
            'user_id': 1,
          }
        }))
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.favoriteComment(board.id, board.comments[0].id)
        expect(props.setFavoriteComment.mock.calls[0]).toEqual([board.id, board.comments[0].id])
      })
      it('should redirect to login page when not authorized', () => {
        window.localStorage.setItem('auth', JSON.stringify({
          auth: {}
        }))
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.favoriteComment(board.id, board.comments[0].id)
        expect(props.history[props.history.length-1]).toEqual("/login")
      })
    })
    describe('favoriteBoard', () => {
      it('should call favoriteBoard when authorized', () => {
        window.localStorage.setItem('auth', JSON.stringify({
          auth: {
            'access-token': 'aaaaaaaaa',
            'client': 'bbbbbbbbb',
            'uid': 'test@example.com',
            'expiry': 1497951304,
            'user_id': 1,
          }
        }))
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.favoriteBoard()
        expect(props.setFavoriteBoard.mock.calls[0]).toEqual([board.id])
      })
      it('should redirect login page when not authorized', () => {
        window.localStorage.setItem('auth', JSON.stringify({
          auth: {}
        }))
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.favoriteBoard()
        expect(props.history[props.history.length-1]).toEqual("/login")
      })
    })
    describe('showCommentModal', () => {
      it('should call showCommentModal', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.showCommentModal({
          id: board.comments[0].id
        })
        expect(props.showCommentModal.mock.calls[0]).toEqual([{id: board.comments[0].id}])
      })
    })
    describe('getMoreComment', () => {
      it('should call getComments', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        wrapper.find(ShowBoard).node.getMoreComment()
        expect(props.getComments.mock.calls[0]).toEqual([board.id, undefined, board.comments[0].id])
      })
    })
    describe('getMoreWebsites', () => {
      it('should call getWebsites', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}/websites`)
        wrapper.find(ShowBoard).node.getMoreWebsites()
        expect(props.getWebsites.mock.calls[0]).toEqual([board.id, undefined, board.websites[0].id])
      })
    })
    describe('getMoreImages', () => {
      it('should call getImages', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}/websites`)
        wrapper.find(ShowBoard).node.getMoreImages()
        expect(props.getImages.mock.calls[0]).toEqual([board.id, undefined, board.images[0].id])
      })
    })
    describe('shouldComponentUpdate', () => {
      it('should return true when pathname changed', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        expect(wrapper.find(ShowBoard).node.shouldComponentUpdate({
          location:{
            pathname: `/boards/${board.id}/images`
          }
        })).toBe(true)
      })
      it('should return true when pathname not change', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        expect(wrapper.find(ShowBoard).node.shouldComponentUpdate({
          location:{
            pathname: `/boards/${board.id}`
          }
        })).toBe(true)
      })
    })
    describe('componentWillUnmount', () => {
      it('should return true when pathname not change', () => {
        const { wrapper, props } = setup(board, `/boards/${board.id}`)
        const instance = wrapper.find(ShowBoard).node
        instance.sub = {
          unsubscribe: jest.fn()
        }
        instance.componentWillUnmount()
        expect(instance.sub.unsubscribe.mock.calls.length).toBe(1)
      })
    })
  })
})
