import * as type from '../../constants/action_types'
import { MatomeChannel } from '../../utils/matome_channel'
import { setErrors } from '../../actions/message'

const getMypageInfomations =  (data) => {
  return { type: type.GET_MYPAGE_INFO, data: data }
}

const setMypageLoading = (loading) => {
  return { type: type.SET_MYPAGE_LOADING, loading: loading }
}

export const getMypageInfomationsAsync = () => {
  return dispatch => {
    dispatch(setMypageLoading(true))
    return MatomeChannel.User.mypage(dispatch).then( (resp) => {
      dispatch(setMypageLoading(false))
      dispatch(getMypageInfomations(resp.data))
    }).catch( (error) => {
      dispatch(setMypageLoading(false))
      console.error('getMypageInfomationsAsync error', error)
      dispatch(setErrors(["エラーが発生しました。しばらく待ってリトライしてみてください…。"]))
    })
  }
}
