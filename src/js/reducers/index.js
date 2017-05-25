import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux'

// board
import message from './message'
import board_list from './board/list'
import show_board from './board/show'
import sign_up from './user/sign_up'
import login from './user/login'
import logout from './user/logout'
import auth from './user/auth'

export default combineReducers({
  auth: auth,
  login: login,
  logout: logout,
  sign_up: sign_up,
  message: message,
  board_list: board_list,
  show_board: show_board,
  routing: routerReducer,
})
