import * as action_type from '../../constants/action_types'

const initialState = {
  "uid": "",
  "client": "",
  "access-token": "",
  "user_id": null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case action_type.SET_AUTH: {
      let auth = state
      const set_keys = Object.keys(action.auth)
      if(set_keys.length > 0){
        // set auth
        set_keys.forEach( (key) => auth[key] = action.auth[key] )
      }else{
        // clear auth
        auth = {}
      }
      return auth
    }
    default:
      return state
  }
}
