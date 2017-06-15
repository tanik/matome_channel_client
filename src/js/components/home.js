import React, { Component } from 'react'
import Auth from '../utils/auth'
import UserHome from '../containers/home/user'
import GuestHome from '../containers/home/guest'

export default class Home extends Component {
  render() {
    if(Auth.isAuthorized()){
      return(<UserHome />)
    }else{
      return(<GuestHome />)
    }
  }
}
