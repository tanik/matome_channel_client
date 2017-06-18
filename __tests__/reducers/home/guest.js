import reducer from '../../../src/js/reducers/home/guest'
import * as types from '../../../src/js/constants/action_types'

describe('guest home reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      boards: [],
      comments: [],
    })
  })

  it('should handle GET_POPULAR_BOARDS', () => {
    const prevState = {
      boards: [],
      comments: [],
    }
    const boards = [{
      id: 1,
      title: 'board title1',
    },{
      id: 2,
      title: 'board title1',
    }]
    expect(
      reducer(prevState, {type: types.GET_POPULAR_BOARDS, boards})
    ).toEqual({
      boards,
      comments: [],
    })
  })

  it('should handle GET_POPULAR_COMMENTS', () => {
    const prevState = {
      boards: [],
      comments: [],
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
    expect(
      reducer(prevState, {type: types.GET_POPULAR_COMMENTS, comments})
    ).toEqual({
      boards: [],
      comments,
    })
  })
})
