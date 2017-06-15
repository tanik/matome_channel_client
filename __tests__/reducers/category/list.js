import reducer from '../../../src/js/reducers/category/list'
import * as types from '../../../src/js/constants/action_types'

describe('category list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      categories: [],
      selected_id: 0,
    })
  })
  it('should handle GET_CATEGORIES', () => {
    const categories = [{name: "test"}]
    const prevState = {
      categories: [],
      selected_id: 0,
    }
    expect(
      reducer(prevState, {
        type: types.GET_CATEGORIES,
        categories
      })
    ).toEqual({
      categories: categories,
      selected_id: 0,
    })
  })

  it('should handle CHANGE_CATEGORY', () => {
    const category_id = 1
    const prevState = {
      categories: [],
      selected_id: 0,
    }
    expect(
      reducer(prevState, {
        type: types.CHANGE_CATEGORY,
        category_id
      })
    ).toEqual({
      categories: [],
      selected_id: category_id,
    })
  })
})
