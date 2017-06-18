import * as type from '../constants/action_types'
import { MatomeChannel } from '../utils/matome_channel'
import { setNotices, setErrors } from '../actions/message'

const postContactSuccess = () => {
  return { type: type.POST_CONTACT_SUCCESS }
}

const setContactErrorsInner = (errors) => {
  return { type: type.SET_CONTACT_ERRORS, errors: errors }
}

export const setContactErrors = (errors) => {
  return dispatch => {
    return new Promise( (resolve) => {
      dispatch(setContactErrorsInner(errors))
      let error_messages = errors.full_messages
      if(!error_messages){
        const field2name = {
          email: 'メールアドレス',
          content: 'お問い合わせ内容',
        }
        error_messages = []
        Object.keys(errors).forEach( (field) => {
          errors[field].forEach( (error) => {
            error_messages.push(`${field2name[field]}${error}`)
          })
        })
      }
      dispatch(setErrors(error_messages))
      resolve()
    })
  }
}

export const postContactAsync = (email, content) => {
  return dispatch => {
    return MatomeChannel.Contact.create(email, content, dispatch).then( (resp) => {
      dispatch(postContactSuccess(resp.data))
      dispatch(setNotices(['送信完了しました！']))
    }).catch( (error) => {
      console.error(error)
      let errors = {
        full_messages: ["エラーが発生しました。しばらくお待ちいただいてから再度リトライしてください。"]
      }
      if( error.response &&
          error.response.data ){
        errors = error.response.data
      }
      dispatch(setContactErrors(errors))
    })
  }
}
