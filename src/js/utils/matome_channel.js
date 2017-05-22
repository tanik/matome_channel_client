import axios from 'axios'
import Auth from './auth'

const api_base = "http://localhost:3000"
const confirm_success_url = "http://localhost:4000/confirmed"

axios.defaults.headers.post['method'] = 'POST';
axios.defaults.headers.post['crossDomain'] = 'true';

export const MatomeChannel = {}

MatomeChannel.Category = class {

  static all(params={}){
    return(axios.get(`${api_base}/categories`, {params: params}))
  }

}

MatomeChannel.Board = class {

  static all(params={}){
    return(axios.get(`${api_base}/boards`, {params: params}))
  }

  static find(id, params={}){
    return(axios.get(`${api_base}/boards/${id}`, {params: params}))
  }

  static create(){
    // TODO
  }
}

MatomeChannel.Comment = class {

  static all(board_id, params={}){
    return(axios.get(`${api_base}/boards/${board_id}/comments`, {params: params}))
  }

  static find(board_id, id, params={}){
    return(axios.get(`${api_base}/boards/${board_id}/comments/${id}`, {params: params}))
  }

  static create(board_id, params){
    return(axios.post(`${api_base}/boards/${board_id}/comments`, {comment: params}))
  }

}

MatomeChannel.Auth = class {

  static signUp(email, password, password_confirmation){
    return(axios.post(`${api_base}/auth`, {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      confirm_success_url: confirm_success_url
    }))
  }

  static login(email, password){
    return(axios.post(`${api_base}/auth/sign_in`, {
      email: email,
      password: password,
    }))
  }

  static logout(){
    return(axios.delete(`${api_base}/auth/sign_out`, { headers: Auth.info() }))
  }

}
