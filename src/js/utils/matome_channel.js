import axios from 'axios'
import Auth from './auth'
import { setAuth } from '../actions/user/auth'

axios.defaults.baseURL = APP_CONFIG.API_BASE

// if use confirmation via email, need to set this to sign_up params 
//const confirm_success_url = "http://localhost:4000/confirmed"

class Client {
  static request(config, dispatch, needAuth=true){
    return new Promise( (resolve, reject) => {
      if(needAuth){
        config.headers = Auth.info()
      }
      let instance = axios.create()
      instance.request(config).then( (response) => {
        let auth = {
          "access-token": response.headers["access-token"],
          uid: response.headers.uid,
          client: response.headers.client
        }
        if( auth["access-token"] && auth.uid && auth.client ){
          if(needAuth){
            dispatch(setAuth(auth))
          }
        }        resolve(response)
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
        url: `/categories`,
        params: params,
      }, dispatch, false)
    )
  }

}

MatomeChannel.Board = class {

  static all(params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `/boards`,
        params: params,
      }, dispatch)
    )
  }

  static find(id, params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `/boards/${id}`,
        params: params,
      }, dispatch)
    )
  }

  static create(category_id, title,  name, content, dispatch){
    return(
      Client.request({
        method: "post",
        url: `/boards/`,
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
        url: `/boards/${board_id}/favorite`,
        data: {},
      }, dispatch)
    )
  }
}

MatomeChannel.Comment = class {

  static all(board_id, gt_id, lt_id, dispatch){
    let url
    if(gt_id && lt_id){
      url = `/boards/${board_id}/comments/gtlt/${gt_id}/${lt_id}`
    }else if(gt_id){
      url = `/boards/${board_id}/comments/gt/${gt_id}`
    }else if(lt_id){
      url = `/boards/${board_id}/comments/lt/${lt_id}`
    }else{
      url = `/boards/${board_id}/comments`
    }
    return(
      Client.request({
        method: "get",
        url: url,
        params: {},
      }, dispatch)
    )
  }

  static get_by_num(board_id, num, dispatch){
    let url
    url = `/boards/${board_id}/comments/num/${num}`
    return(
      Client.request({
        method: "get",
        url: url,
        params: {},
      }, dispatch)
    )
  }

  static find(board_id, id, params={}, dispatch){
    return(
      Client.request({
        method: "get",
        url: `/boards/${board_id}/comments/${id}`,
        params: params,
      }, dispatch)
    )
  }

  static create(board_id, name, content, dispatch){
    return(
      Client.request({
        method: "post",
        url: `/boards/${board_id}/comments/`,
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
        url: `/boards/${board_id}/comments/${id}/favorite`,
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
        url: `/auth`,
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
        url: `/auth/sign_in`,
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
        url: `/auth/sign_out`,
      }, dispatch)
    )
  }
}
