import axios from 'axios'
import Auth from './auth'
import { setAuth } from '../actions/user/auth'

const api_base = APP_CONFIG.API_BASE

// if use confirmation via email, need to set this to sign_up params 
//const confirm_success_url = "http://localhost:4000/confirmed"

class Client {
  static request(config, dispatch){
    return new Promise( (resolve, reject) => {
      config.headers = Auth.info()
      axios(config).then( (response) => {
        let auth = {
          "access-token": response.headers["access-token"],
          uid: response.headers.uid,
          client: response.headers.client
        }
        if( auth["access-token"] && auth.uid && auth.client ){
          dispatch(setAuth(auth))
        }
        resolve(response)
      }).catch( (error) => {
        if(error.response &&
           error.response.status == 401 ){
          // token期限切れ？
          dispatch(setAuth({}))
        }
        reject(error)
      })
    })
  }
}

export const MatomeChannel = {}

MatomeChannel.Category = class {

  static all(params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `${api_base}/categories`,
        params: params,
      }, dispatch)
    )
  }

}

MatomeChannel.Board = class {

  static all(params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `${api_base}/boards`,
        params: params,
      }, dispatch)
    )
  }

  static find(id, params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `${api_base}/boards/${id}`,
        params: params,
      }, dispatch)
    )
  }

  static create(category_id, title,  name, content, dispatch){
    return(
      Client.request({
        method: "post",
        url: `${api_base}/boards/`,
        data: {
          board: {
            category_id: category_id,
            title: title,
            comments_attributes: [{
              name: name,
              content: content,
            }]
          }
        },
      }, dispatch)
    )
  }

  static favorite(board_id, dispatch){
    return(
      Client.request({
        method: "put",
        url: `${api_base}/boards/${board_id}/favorite`,
        data: {},
      }, dispatch)
    )
  }
}

MatomeChannel.Comment = class {

  static all(board_id, params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `${api_base}/boards/${board_id}/comments`,
        params: params,
      }, dispatch)
    )
  }

  static find(board_id, id, params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `${api_base}/boards/${board_id}/comments/${id}`,
        params: params,
      }, dispatch)
    )
  }

  static create(board_id, name, content, dispatch){
    return(
      Client.request({
        method: "post",
        url: `${api_base}/boards/${board_id}/comments/`,
        data: {
          name: name,
          content: content,
        },
      }, dispatch)
    )
  }

  static favorite(board_id, id, dispatch){
    return(
      Client.request({
        method: "put",
        url: `${api_base}/boards/${board_id}/comments/${id}/favorite`,
        data: {},
      }, dispatch)
    )
  }
}

MatomeChannel.Auth = class {

  static signUp(email, password, password_confirmation, dispatch){
    return(
      Client.request({
        method: "post",
        url: `${api_base}/auth`,
        data: {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
      }, dispatch)
    )
  }

  static login(email, password, dispatch){
    return(
      Client.request({
        method: "post",
        url: `${api_base}/auth/sign_in`,
        data: {
          email: email,
          password: password,
        },
      }, dispatch)
    )
  }

  static logout(dispatch){
    return(
      Client.request({
        method: "delete",
        url: `${api_base}/auth/sign_out`,
      }, dispatch)
    )
  }

}
