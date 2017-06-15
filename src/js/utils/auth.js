export default class Auth {
  static currentUserId(){
    return(this.info().user_id)
  }

  static info(){
    const auth_info = window.localStorage.getItem("auth")
    if(auth_info){
      return(JSON.parse(auth_info).auth)
    }else{
      return({})
    }
  }

  static isAuthorized(){
    const info = this.info()
    if(info["access-token"] && info["client"] && info["uid"] ){
      return true
    }else{
      return false
    }
  }
}
