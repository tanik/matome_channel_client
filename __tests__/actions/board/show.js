import * as actions from '../../../src/js/actions/board/show'
import * as types from '../../../src/js/constants/action_types'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import '../../../__mock__/localstrage'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const host = APP_CONFIG.API_BASE

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

console.error = () => {}

describe('actions', () => {
  it('should create an action to get board async success', () => {
    const board_id = 1
    const board = {title: "test"}
    nock(host)
      .get(`/boards/${board_id}`)
      .reply(200, board)
    const expectedActions = [{
      type: types.GET_BOARD,
      board
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getBoardAsync(board_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get board async failure', () => {
    const board_id = 1
    nock(host)
      .get(`/boards/${board_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getBoardAsync(board_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to add comment', () => {
    const comment = {name: "test", content: "test content"}
    const expectedAction = {
      type: types.ADD_COMMENT,
      comment
    }
    expect(actions.addComment(comment)).toEqual(expectedAction)
  })

  it('should create an action to set favorite board async success', () => {
    const board_id = 1
    const favorite = {id: 1, user_id: 1, board_id: 1}
    nock(host)
      .put(`/boards/${board_id}/favorite`)
      .reply(200, favorite)
    const expectedActions = []
    const store = mockStore({ board: {} })
    return store.dispatch(actions.setFavoriteBoardAsync(board_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to set favorite board async failure', () => {
    const board_id = 1
    nock(host)
      .put(`/boards/${board_id}/favorite`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.setFavoriteBoardAsync(board_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to set favorite comment async success', () => {
    const board_id = 1
    const comment_id = 1
    const favorite = {id: 1, user_id: 1, comment_id: 1}
    nock(host)
      .put(`/boards/${board_id}/comments/${comment_id}/favorite`)
      .reply(200, favorite)
    const expectedActions = []
    const store = mockStore({ board: {} })
    return store.dispatch(actions.setFavoriteCommentAsync(board_id, comment_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to set favorite comment async failure', () => {
    const board_id = 1
    const comment_id = 1
    nock(host)
      .put(`/boards/${board_id}/comments/${comment_id}/favorite`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.setFavoriteCommentAsync(board_id, comment_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to change favorite board', () => {
    const favorite = {id: 1, user_id: 1, board_id: 1}
    const expectedAction = {
      type: types.CHANGE_FAVORITE_BOARD,
      favorite
    }
    expect(actions.changeFavoriteBoard(favorite)).toEqual(expectedAction)
  })

  it('should create an action to change favorite comment', () => {
    const favorite = {id: 1, user_id: 1, comment_id: 1}
    const expectedAction = {
      type: types.CHANGE_FAVORITE_COMMENT,
      favorite
    }
    expect(actions.changeFavoriteComment(favorite)).toEqual(expectedAction)
  })

  it('should create an action to add board image', () => {
    const board_image = {id: 1, board_id: 1, image_id: 1}
    const expectedAction = {
      type: types.ADD_BOARD_IMAGE,
      board_image
    }
    expect(actions.addBoardImage(board_image)).toEqual(expectedAction)
  })

  it('should create an action to add board website', () => {
    const board_website = {id: 1, board_id: 1, website_id: 1}
    const expectedAction = {
      type: types.ADD_BOARD_WEBSITE,
      board_website
    }
    expect(actions.addBoardWebsite(board_website)).toEqual(expectedAction)
  })

  it('should create an action to add comment image', () => {
    const comment_image = {id: 1, comment_id: 1, image_id: 1}
    const expectedAction = {
      type: types.ADD_COMMENT_IMAGE,
      comment_image
    }
    expect(actions.addCommentImage(comment_image)).toEqual(expectedAction)
  })

  it('should create an action to add comment website', () => {
    const comment_website = {id: 1, comment_id: 1, website_id: 1}
    const expectedAction = {
      type: types.ADD_COMMENT_WEBSITE,
      comment_website
    }
    expect(actions.addCommentWebsite(comment_website)).toEqual(expectedAction)
  })

  it('should create an action to get comments async success', () => {
    const board_id = 1
    const gt_id = undefined
    const lt_id = 10
    const comments = [{
      id: 1,
      name: "test name",
      content: "test content"
    }]
    nock(host)
      .get(`/boards/${board_id}/comments/lt/${lt_id}`)
      .reply(200, comments)
    const expectedActions = [{
      type: types.GET_COMMENTS_SUCCESS,
      comments
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getCommentsAsync(board_id, gt_id, lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get comments async failure', () => {
    const board_id = 1
    const gt_id = undefined
    const lt_id = 10
    nock(host)
      .get(`/boards/${board_id}/comments/lt/${lt_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getCommentsAsync(board_id, gt_id, lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get websites async success', () => {
    const board_id = 1
    const gt_id = undefined
    const lt_id = 10
    const websites = [{
      id: 1,
      boaed_id: 1,
      website: {
        id: 1,
        thumbnail: 'http://img.m-ch.xyz/websites/thumbnails/1.png',
        full: 'http://img.m-ch.xyz/websites/images/1.png',
      }
    }]
    nock(host)
      .get(`/boards/${board_id}/websites/lt/${lt_id}`)
      .reply(200, websites)
    const expectedActions = [{
      type: types.GET_WEBSITES_SUCCESS,
      websites
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getWebsitesAsync(board_id, gt_id, lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get websites async failure', () => {
    const board_id = 1
    const gt_id = undefined
    const lt_id = 10
    nock(host)
      .get(`/boards/${board_id}/websites/lt/${lt_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getWebsitesAsync(board_id, gt_id, lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get images async success', () => {
    const board_id = 1
    const gt_id = undefined
    const lt_id = 10
    const images = [{
      id: 1,
      boaed_id: 1,
      image: {
        id: 1,
        thumbnail: 'http://img.m-ch.xyz/images/thumbnails/1.png',
        full: 'http://img.m-ch.xyz/images/images/1.png',
      }
    }]
    nock(host)
      .get(`/boards/${board_id}/images/lt/${lt_id}`)
      .reply(200, images)
    const expectedActions = [{
      type: types.GET_IMAGES_SUCCESS,
      images
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getImagesAsync(board_id, gt_id, lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create an action to get images async failure', () => {
    const board_id = 1
    const gt_id = undefined
    const lt_id = 10
    nock(host)
      .get(`/boards/${board_id}/images/lt/${lt_id}`)
      .reply(500)
    const expectedActions = [{
      type: types.SET_ERRORS,
      errors: ["エラーが発生しました。しばらく待ってリトライしてみてください…。"],
    }]
    const store = mockStore({ board: {} })
    return store.dispatch(actions.getImagesAsync(board_id, gt_id, lt_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
