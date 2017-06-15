// action types

// menu
export const CHANGE_QUERY                      = 'CHANGE_QUERY'

// message
export const SET_NOTICES                       = 'SET_NOTICES'
export const SET_ERRORS                        = 'SET_ERRORS'
export const CLEAR_MESSAGES                    = 'CLEAR_MESSAGES'

// guest home
export const GET_POPULAR_BOARDS                = 'GET_POPULAR_BOARDS'
export const GET_POPULAR_COMMENTS              = 'GET_POPULAR_COMMENTS'
// user home
export const GET_MYPAGE_INFO                   = 'GET_MYPAGE_INFO'
export const SET_MYPAGE_LOADING                = 'SET_MYPAGE_LOADING'

// category
export const GET_CATEGORIES                    = 'GET_CATEGORIES'
export const CHANGE_CATEGORY                   = 'CHANGE_CATEGORY'

// board list
export const GET_BOARDS                        = 'GET_BOARDS'
export const GET_BOARD                         = 'GET_BOARD'
// board new
export const SET_NEW_BOARD_CATEGORIES          = 'SET_NEW_BOARD_CATEGORIES'
export const OPEN_NEW_BOARD_MODAL              = 'OPEN_NEW_BOARD_MODAL'
export const CLOSE_NEW_BOARD_MODAL             = 'CLOSE_NEW_BOARD_MODAL'
export const POST_BOARD_SUCCESS                = 'POST_BOARD_SUCCESS'
export const POST_BOARD_FAILURE                = 'POST_BOARD_FAILURE'
// board show
export const ADD_COMMENT                       = 'ADD_COMMENT'
export const CHANGE_FAVORITE_BOARD             = 'CHANGE_FAVORITE_BOARD'
export const CHANGE_FAVORITE_COMMENT           = 'CHANGE_FAVORITE_COMMENT'
export const BOARD_FAVORITE_SUCCESS            = 'BOARD_FAVORITE_SUCCESS'
export const BOARD_FAVORITE_FAILURE            = 'BOARD_FAVORITE_FAILURE'
export const COMMENT_FAVORITE_SUCCESS          = 'COMMENT_FAVORITE_SUCCESS'
export const COMMENT_FAVORITE_FAILURE          = 'COMMENT_FAVORITE_FAILURE'
export const POST_COMMENT_SUCCESS              = 'POST_COMMENT_SUCCESS'
export const POST_COMMENT_FAILURE              = 'POST_COMMENT_FAILURE'
export const ADD_BOARD_IMAGE                   = 'ADD_BOARD_IMAGE'
export const ADD_BOARD_WEBSITE                 = 'ADD_BOARD_WEBSITE'
export const ADD_COMMENT_IMAGE                 = 'ADD_COMMENT_IMAGE'
export const ADD_COMMENT_WEBSITE               = 'ADD_COMMENT_WEBSITE'
export const GET_COMMENTS_SUCCESS              = 'GET_COMMENTS_SUCCESS'
export const GET_WEBSITES_SUCCESS              = 'GET_WEBSITES_SUCCESS'
export const GET_IMAGES_SUCCESS                = 'GET_IMAGES_SUCCESS'

// comment
export const CHANGE_MODAL_COMMENTS             = 'CHANGE_MODAL_COMMENTS'
export const OPEN_COMMENT_MODAL                = 'OPEN_COMMENT_MODAL'
export const CLOSE_COMMENT_MODAL               = 'CLOSE_COMMENT_MODAL'
export const CHANGE_FAVORITE_COMMENT_ON_MODAL  = 'CHANGE_FAVORITE_COMMENT_ON_MODAL'

// contact
export const POST_CONTACT_SUCCESS              = 'POST_CONTACT_SUCCESS'
export const SET_CONTACT_ERRORS                = 'SET_CONTACT_ERRORS'

// signup
export const SIGN_UP_SUCCESS                   = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE                   = 'SIGN_UP_FAILURE'

// login
export const LOGIN_SUCCESS                     = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE                     = 'LOGIN_FAILURE'

// logout
export const LOGOUT_SUCCESS                    = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE                    = 'LOGOUT_FAILURE'

// auth
export const SET_AUTH                          = 'SET_AUTH'
