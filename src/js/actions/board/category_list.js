import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'

const getCategoryList =  (categories) => {
  return { type: type.GET_CATEGORY_LIST, categories: categories }
}

export const changeCategory =  (category_id) => {
  return { type: type.CHANGE_CATEGORY, category_id: category_id }
}

export const getCategoryListAsync = () => {
  return dispatch => {
    return MatomeChannel.Category.all({}).then( (resp) => {
      dispatch(getCategoryList(resp.data))
    })
  }
}
