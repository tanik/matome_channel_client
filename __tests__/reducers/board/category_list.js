import reducer from '../../../src/js/reducers/board/category_list'
import * as types from '../../../src/js/constants/action_types'

describe('category list reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      categories: [],
      selected_category_id: 0,
    })
  })

  it('should handle GET_CATEGORY_LIST', () => {
    const categories = [{name: "test"}]
    const prevState = {
      categories: [],
      selected_category_id: 0,
    }
    expect(
      reducer(prevState, {
        type: types.GET_CATEGORY_LIST,
        categories
      })
    ).toEqual({
      categories: categories,
      selected_category_id: prevState.selected_category_id,
    })
  })

  it('should handle CHANGE_CATEGORY', () => {
    const category_id = 1
    const prevState = {
      categories: [],
      selected_category_id: 0,
    }
    expect(
      reducer(prevState, {
        type: types.CHANGE_CATEGORY,
        category_id
      })
    ).toEqual({
      categories: prevState.categories,
      selected_category_id: category_id,
    })
  })
})
