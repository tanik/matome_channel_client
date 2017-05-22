import * as type from '../../constants/action_types'
import { setNotices, setErrors } from '../../actions/message'
import { setAuth } from '../../actions/user/auth'
import { MatomeChannel } from '../../utils/matome_channel'

const loginSuccess = (response) => {
  return { type: type.LOGIN_SUCCESS, response: response }
}

const loginFailure = (response) => {
  return { type: type.LOGIN_FAILURE, response: response }
}

export const loginAsync = (email, password, history) => {
  return dispatch => {
    
    return MatomeChannel.Auth.login(email, password).then( (resp) => {
      let auth= {
        "access-token": resp.headers["access-token"],
        uid: resp.headers.uid,
        client: resp.headers.client
      }
      dispatch(setAuth(auth))
      dispatch(loginSuccess(resp.data))
      dispatch(setNotices(["ログインしました！"]))
    }).catch( (error) => {
      let error_messages = ["エラーが発生しました。しばらくお待ちいただいてから再度リトライしてください。"]
      if( error.response &&
          error.response.data &&
          error.response.data.errors ){
        error_messages = error.response.data.errors
      }
      let resp_data = ((error.response || {}).data || {})
      dispatch(loginFailure(resp_data))
      dispatch(setErrors(error_messages))
    })
  }
}
