import reducer from '../../../src/js/reducers/user/comment'
import * as types from '../../../src/js/constants/action_types'

describe('user comment reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      comments: [],
      per: 20,
      page: 1,
      total_page: 1,
      next_page: null,
      prev_page: null,
    })
  })

  it('should handle GET_MY_COMMENTS', () => {
    const prevState = {
      boards: [],
      per: 20,
      page: 1,
      total_page: 1,
      next_page: null,
      prev_page: null,
    }
    const comments = [{
      id: 2,
      num: 2,
      name: 'name 2',
      content: 'content 2'
    },{
      id: 1,
      num: 1,
      name: 'name 1',
      content: 'content 1'
    }]
    const pagination = {
      per: 20,
      current: 2,
      total: 3,
      next: 3,
      prev: 1,
    }
    expect(
      reducer(prevState, {type: types.GET_MY_COMMENTS, comments, pagination})
    ).toEqual({
      comments,
      per: 20,
      page: 2,
      total_page: 3,
      next_page: 3,
      prev_page: 1,
    })
  })
})
