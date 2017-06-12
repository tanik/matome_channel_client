import PropTypes from 'prop-types'
import React, {Component} from 'react'
import AlertContainer from 'react-alert'

export default class Message extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(){
    this.showNotices()
    this.showErrors()
  }

  showNotices() {
    if(this.props.notices && this.props.notices.length > 0 ){
      this.msg.success(
        <ul className="alert">
          { this.props.notices.map( (notice, i) => <li key={i}>{ notice }</li> ) }
        </ul>
      )
      this.props.clearMessages()
    }
  }

  showErrors() {
    if(this.props.errors && this.props.errors.length > 0 ){
      this.msg.error(
        <ul className="alert">
          { this.props.errors.map( (error, i) => <li key={i}>{ error }</li> ) }
        </ul>
      )
      this.props.clearMessages()
    }
  }

  render() {
    return(
      <div>
        <AlertContainer
          ref={ ref => this.msg = ref }
          offset={ 14 }
          position={ 'top left' }
          theme={ 'light' }
          time={ 5000 }
          transition={ 'scale' }
        />
      </div>
    )
  }
}

Message.propTypes = {
  notices: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired,
  setNotices: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
}
