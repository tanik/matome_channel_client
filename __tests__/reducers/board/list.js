import reducer from '../../../src/js/reducers/board/list'
import * as types from '../../../src/js/constants/action_types'

describe('board list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      boards: [],
      per: 20,
      page: 1
    })
  })

  it('should handle GET_BOARD_LIST', () => {
    const boards = [{title: "test"}]
    const per    = 30
    const page   = 10
    const prevState = {
      boards: [],
      per: 20,
      page: 1
    }
    expect(
      reducer(prevState, {
        type: types.GET_BOARD_LIST, boards, per, page
      })
    ).toEqual({boards, per, page})
  })
})
