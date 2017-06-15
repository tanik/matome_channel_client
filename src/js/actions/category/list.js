import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setNewBoardCategories } from '../../actions/board/new'
import { setErrors } from '../../actions/message'

export const changeCategory =  (category_id) => {
  return { type: type.CHANGE_CATEGORY, category_id: category_id }
}

const getCategories =  (categories) => {
  return { type: type.GET_CATEGORIES, categories: categories }
}

export const getCategoriesAsync = () => {
  return dispatch => {
    return MatomeChannel.Category.all({}, dispatch).then( (resp) => {
      dispatch(getCategories(resp.data))
      dispatch(setNewBoardCategories(resp.data))
    }).catch( (error) => {
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
      console.error('getCategoriesAsync error', error)
    })
  }
}
