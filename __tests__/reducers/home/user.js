import reducer from '../../../src/js/reducers/home/user'
import * as types from '../../../src/js/constants/action_types'

describe('user home reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      loading: true,
      has_more_comments: true,
      comments: [],
      populars: [],
      recommends: [],
      histories: [],
    })
  })

  it('should handle GET_MYPAGE_INFO', () => {
    const prevState = {
      loading: true,
      has_more_comments: true,
      comments: [],
      populars: [],
      recommends: [],
      histories: [],
    }
    const comments = [{
      id: 1,
      num: 1,
      name: 'name1',
      content: 'content1',
    },{
      id: 2,
      num: 2,
      name: 'name2',
      content: 'content2',
    }]
    const populars = [{
      id: 3,
      num: 3,
      name: 'name3',
      content: 'content3',
    },{
      id: 2,
      num: 2,
      name: 'name4',
      content: 'content4',
    }]
    const recommends = [{
      id: 1,
      title: 'board title1'
    },{
      id: 2,
      title: 'board title2'
    }]
    const histories = [{
      id: 1,
      title: 'board title1'
    },{
      id: 2,
      title: 'board title2'
    }]
    const data = {
      comments,
      populars,
      recommends,
      histories,
    }
    expect(
      reducer(prevState, {type: types.GET_MYPAGE_INFO, data})
    ).toEqual({
      loading: true,
      has_more_comments: false,
      comments,
      populars,
      recommends,
      histories,
    })
  })

  it('should handle SET_MYPAGE_LOADING', () => {
    const prevState = {
      loading: true,
      has_more_comments: true,
      comments: [],
      populars: [],
      recommends: [],
      histories: [],
    }
    const loading = false
    expect(
      reducer(prevState, {type: types.SET_MYPAGE_LOADING, loading})
    ).toEqual({
      loading: false,
      has_more_comments: true,
      comments: [],
      populars: [],
      recommends: [],
      histories: [],
    })
  })

  it('should handle ADD_COMMENT_ON_TL', () => {
    const prevState = {
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
      }],
      populars: [],
      recommends: [],
      histories: [],
    }
    const comment = {
      id: 3,
      num: 3,
      name: 'name3',
      content: 'content3',
    }
    expect(
      reducer(prevState, {type: types.ADD_COMMENT_ON_TL, comment})
    ).toEqual({
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 3,
        num: 3,
        name: 'name3',
        content: 'content3',
      },{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
      }],
      populars: [],
      recommends: [],
      histories: [],
    })
  })

  it('should handle ADD_COMMENT_WEBSITE_ON_TL', () => {
    const prevState = {
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
        websites: []
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
        websites: []
      }],
      populars: [],
      recommends: [],
      histories: [],
    }
    const website = {
      id: 1,
      title: 'Example',
      original_url: 'http://example.com',
      thumbnail_url: 'http://img.m-ch.xyz/thumbnail.png',
      full_url: 'http://img.m-ch.xyz/full.png',
    }
    const comment_website = {
      id: 3,
      comment_id: 2,
      website,
    }
    expect(
      reducer(prevState, {type: types.ADD_COMMENT_WEBSITE_ON_TL, comment_website})
    ).toEqual({
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
        websites: [website]
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
        websites: []
      }],
      populars: [],
      recommends: [],
      histories: [],
    })
  })

  it('should handle ADD_COMMENT_IMAGE_ON_TL', () => {
    const prevState = {
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
        images: []
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
        images: []
      }],
      populars: [],
      recommends: [],
      histories: [],
    }
    const image = {
      id: 1,
      original_url: 'http://example.com/sample.png',
      thumbnail_url: 'http://img.m-ch.xyz/thumbnail.png',
      full_url: 'http://img.m-ch.xyz/full.png',
    }
    const comment_image = {
      id: 3,
      comment_id: 1,
      image,
    }
    expect(
      reducer(prevState, {type: types.ADD_COMMENT_IMAGE_ON_TL, comment_image})
    ).toEqual({
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
        images: []
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
        images: [image]
      }],
      populars: [],
      recommends: [],
      histories: [],
    })
  })

  it('should handle CHANGE_FAVORITE_COMMENT_ON_TL', () => {
    const prevState = {
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
        favorite_user_ids: []
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
        favorite_user_ids: []
      }],
      populars: [],
      recommends: [],
      histories: [],
    }
    const favorite = {
      id: 1,
      comment_id: 1,
      user_id: 1,
    }
    expect(
      reducer(prevState, {type: types.CHANGE_FAVORITE_COMMENT_ON_TL, favorite})
    ).toEqual({
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
        favorite_user_ids: []
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
        favorite_user_ids: [favorite.user_id]
      }],
      populars: [],
      recommends: [],
      histories: [],
    })
  })

  it('should handle GET_MORE_COMMENTS_ON_TL', () => {
    const prevState = {
      loading: true,
      has_more_comments: true,
      comments: [{
        id: 5,
        num: 5,
        name: 'name5',
        content: 'content5',
      },{
        id: 4,
        num: 4,
        name: 'name4',
        content: 'content4',
      }],
      populars: [],
      recommends: [],
      histories: [],
    }
    const comments = [{
      id: 3,
      num: 3,
      name: 'name3',
      content: 'content3',
    },{
      id: 2,
      num: 2,
      name: 'name2',
      content: 'content2',
    },{
      id: 1,
      num: 1,
      name: 'name1',
      content: 'content1',
    }]
    expect(
      reducer(prevState, {type: types.GET_MORE_COMMENTS_ON_TL, comments})
    ).toEqual({
      loading: true,
      has_more_comments: false,
      comments: [{
        id: 5,
        num: 5,
        name: 'name5',
        content: 'content5',
      },{
        id: 4,
        num: 4,
        name: 'name4',
        content: 'content4',
      },{
        id: 3,
        num: 3,
        name: 'name3',
        content: 'content3',
      },{
        id: 2,
        num: 2,
        name: 'name2',
        content: 'content2',
      },{
        id: 1,
        num: 1,
        name: 'name1',
        content: 'content1',
      }],
      populars: [],
      recommends: [],
      histories: [],
    })
  })
})
