import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Well } from 'react-bootstrap'
import Auth from '../../utils/auth'

export default class Logout extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.logout()
  }

  render(){
    if( Auth.isAuthorized() ){
      return(
        <Grid>
          <Well>
            ログアウト中
          </Well>
        </Grid>
      )
    }else{
      return(<Redirect to="/" />)
    }
  }
}

Logout.propTypes = {
  logouted: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
