import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Well, ProgressBar } from 'react-bootstrap'
import Auth from '../../utils/auth'

export default class Logout extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(Auth.isAuthorized()){
      this.props.logout()
    }
  }

  render(){
    if( Auth.isAuthorized() ){
      return(
        <Grid className='logout'>
          <Well>
            <p>ログアウト中です…</p>
            <ProgressBar active now={100} />
          </Well>
        </Grid>
      )
    }else{
      return(<Redirect to="/" />)
    }
  }
}

Logout.propTypes = {
  toggle: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
