import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Grid,
  Well,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

export default class Contact extends Component {
  constructor(props) {
    super(props)
  }

  post(e){
    e.preventDefault()
    let errors = {
      email: false,
      content: false,
      full_messages: [],
    }
    const email_value = this.email.value.trim()
    const content_value = this.content.value.trim()
    if(email_value.length == 0){
      errors.email = ['を入力してください']
    }
    if(content_value.length == 0){
      errors.content = ['を入力してください']
    }
    if(errors.email || errors.content){
      this.props.setContactErrors(errors)
    }else{
      this.props.postContact(email_value, content_value)
    }
  }

  isValid(field){
    if(this.props.errors && this.props.errors[field]){
      return("error")
    }
  }

  render() {
    if(this.props.posted){
      return(<Redirect to='/' />)
    }
    return (
      <div className="contact">
        <Well>
          <Grid>
            <h3>お問い合わせ</h3>
          </Grid>
        </Well>
        <Grid>
          <form className="form-horizontal" onSubmit={ this.post.bind(this) }>
            <FormGroup validationState={ this.isValid("email") }>
              <Col componentClass={ControlLabel} xs={12} sm={3}>
                メールアドレス
              </Col>
              <Col xs={12} sm={5}>
                <FormControl
                  required
                  type="email"
                  inputRef={ (ref) => { this.email = ref } }/>
              </Col>
            </FormGroup>
            <FormGroup validationState={ this.isValid("content") }>
              <Col componentClass={ControlLabel} xs={12} sm={3}>
                お問い合わせ内容
              </Col>
              <Col xs={12} sm={9}>
                <FormControl componentClass="textarea"
                placeholder=""
                rows="10"
                inputRef={ ref => { this.content = ref } }
                required/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col xsOffset={0} xs={12} smOffset={3} sm={9}>
                <Button type="submit">
                  送信する
                </Button>
              </Col>
            </FormGroup>
          </form>
        </Grid>
      </div>
    )
  }
}

Contact.propTypes = {
  posted: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  setContactErrors: PropTypes.func.isRequired,
  postContact: PropTypes.func.isRequired,
}
