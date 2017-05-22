import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Message extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  componentWillUnmount(){
    this.props.clearMessage && this.props.clearMessage()
  }

  renderNotices() {
    if(this.props.notices && this.props.notices.length > 0 ){
      return(
        <div className="alert alert-success" role="alert">
          <ul>
            { this.props.notices.map( (notice, i) => <li key={i}>{ notice }</li> ) }
          </ul>
        </div>
      )
    }
  }

  renderErrors() {
    if(this.props.errors && this.props.errors.length > 0 ){
      return(
        <div className="alert alert-danger" role="alert">
          <ul>
            { this.props.errors.map( (error, i) => <li key={i}>{ error }</li> ) }
          </ul>
        </div>
      )
    }
  }
  render() {
    return(
      <div className="message-box">
        { this.renderNotices() }
        { this.renderErrors() }
      </div>
    )
  }
}

Message.propTypes = {
  notices: PropTypes.array,
  errors: PropTypes.array,
  setNotices: PropTypes.func,
  setErrors: PropTypes.func,
  clearMessages: PropTypes.func,
}
