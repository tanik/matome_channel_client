import * as type from '../../constants/action_types'
import { setErrors } from '../../actions/message'
import { setAuth } from '../../actions/user/auth'
import { MatomeChannel } from '../../utils/matome_channel'

const logoutSuccess = () => {
  return { type: type.LOGOUT_SUCCESS }
}

const logoutFailure = () => {
  return { type: type.LOGOUT_FAILURE }
}

export const logoutAsync = () => {
  return dispatch => {
    return MatomeChannel.Auth.logout().then( () => {
      dispatch(setAuth({}))
      dispatch(logoutSuccess())
    }).catch( () => {
      let error_messages = ["エラーが発生しました。しばらくお待ちいただいてから再度リトライしてください。"]
      dispatch(logoutFailure())
      dispatch(setErrors(error_messages))
    })
  }
}
