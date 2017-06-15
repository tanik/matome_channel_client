import reducer from '../../../src/js/reducers/board/list'
import * as types from '../../../src/js/constants/action_types'

describe('board list reducer', () => {
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

  it('should handle GET_BOARDS', () => {
    const boards = [{title: "test"}]
    const pagination ={
      per: 30,
      current: 2,
      totale: 3,
      next: 3,
      prev: 1,
    }
    const prevState = {
      boards: [],
      per: 20,
      page: 1,
      total_page: 1,
      next_page: null,
      prev_page: null,
    }
    expect(
      reducer(prevState, {
        type: types.GET_BOARDS, boards, pagination
      })
    ).toEqual({
      boards,
      per: pagination.per,
      page: pagination.current,
      total_page: pagination.total,
      next_page: pagination.next,
      prev_page: pagination.prev,
    })
  })
})
