import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux'

import menu from './menu'
import message from './message'
import contact from './contact'
import guest_home from './home/guest'
import user_home from './home/user'
import category_list from './category/list'
import board_list from './board/list'
import new_board from './board/new'
import show_board from './board/show'
import new_comment from './comment/new'
import comment_modal from './comment/comment_modal'
import sign_up from './user/sign_up'
import login from './user/login'
import logout from './user/logout'
import auth from './user/auth'
import my_boards from './user/board'
import my_comments from './user/comment'

export default combineReducers({
  auth: auth,
  login: login,
  logout: logout,
  sign_up: sign_up,
  menu: menu,
  message: message,
  contact: contact,
  guest_home: guest_home,
  user_home: user_home,
  my_boards: my_boards,
  my_comments: my_comments,
  category_list: category_list,
  new_board: new_board,
  board_list: board_list,
  show_board: show_board,
  new_comment: new_comment,
  comment_modal: comment_modal,
  routing: routerReducer,
})
