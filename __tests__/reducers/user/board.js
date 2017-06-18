import reducer from '../../../src/js/reducers/user/board'
import * as types from '../../../src/js/constants/action_types'

describe('user board reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      boards: [],
      per: 20,
      page: 1,
      total_page: 1,
      next_page: null,
      prev_page: null,
    })
  })

  it('should handle GET_MY_BOARDS', () => {
    const prevState = {
      boards: [],
      per: 20,
      page: 1,
      total_page: 1,
      next_page: null,
      prev_page: null,
    }
    const boards = [{
      id: 2,
      title: 'board 2'
    },{
      id: 1,
      title: 'board 1'
    }]
    const pagination = {
      per: 20,
      current: 2,
      total: 3,
      next: 3,
      prev: 1,
    }
    expect(
      reducer(prevState, {type: types.GET_MY_BOARDS, boards, pagination})
    ).toEqual({
      boards: boards,
      per: 20,
      page: 2,
      total_page: 3,
      next_page: 3,
      prev_page: 1,
    })
  })
})
