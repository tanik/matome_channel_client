import * as type from '../../constants/action_types'
import { setNotices, setErrors } from '../../actions/message'
import { MatomeChannel } from '../../utils/matome_channel'

const signUpSuccess = (response) => {
  return { type: type.SIGN_UP_SUCCESS, response: response }
}

const signUpFailure = (response) => {
  return { type: type.SIGN_UP_FAILURE, response: response }
}

export const signUpAsync = (email, password, password_confirmation) => {
  return dispatch => {
    return MatomeChannel.Auth.signUp(email, password, password_confirmation, dispatch).then( (resp) => {
      dispatch(signUpSuccess(resp.data))
      dispatch(setNotices(["ユーザ登録が完了しました！"]))
    }).catch( (error) => {
      let error_messages = ["エラーが発生しました。しばらくお待ちいただいてから再度リトライしてください。"]
      if( error.response &&
          error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.full_messages){
        error_messages = error.response.data.errors.full_messages
      }
      let resp_data = ((error.response || {}).data || {})
      dispatch(signUpFailure(resp_data))
      dispatch(setErrors(error_messages))
    })
  }
}
