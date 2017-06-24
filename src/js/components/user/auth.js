import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class Auth extends Component {
  constructor(props) {
    super(props)
  }

  isAuthorized(){
    if(this.props.uid &&
       this.props.client &&
       this.props['access-token'] &&
       this.props.expiry
    ){
      return true
    }else{
      return false
    }
  }

  render() {
    if( this.isAuthorized() ){
      return( <Route children={this.props.children} /> )
    } else {
      return( <Redirect to={'/login'} /> )
    }
  }
}

Auth.propTypes = {
  "access-token": PropTypes.string,
  "uid": PropTypes.string,
  "client": PropTypes.string,
  "expiry": PropTypes.number,
  "user_id": PropTypes.number,
}
