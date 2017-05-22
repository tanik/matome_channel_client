import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Well, Grid, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import Message from "../../containers/message";
import Auth from "../../utils/auth";

export default class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  signUp(e){
    e.preventDefault();
    this.props.signUp(this.email.value, this.password.value, this.password_confirmation.value)
  }

  isValid(field){
    if(this.props.response.errors && this.props.response.errors[field]){
      return("error")
    }
  }

  renderForm() {
    return(
      <div>
        <Well>
          <Grid>
            <h2>ユーザ登録</h2>
          </Grid>
        </Well>
        <Grid>
        <form className="form-horizontal" onSubmit={ this.signUp.bind(this) }>
          <Message />
          <FormGroup validationState={ this.isValid("email") }>
            <Col componentClass={ControlLabel} xs={2}>
              メールアドレス
            </Col>
            <Col xs={4}>
              <FormControl type="email" inputRef={ (ref) => { this.email = ref } }/>
            </Col>
          </FormGroup>
          <FormGroup validationState={ this.isValid("password") }>
            <Col componentClass={ControlLabel} xs={2}>
              パスワード
            </Col>
            <Col xs={4}>
              <FormControl type="password" inputRef={ (ref) => { this.password = ref } }/>
            </Col>
          </FormGroup>
          <FormGroup validationState={ this.isValid("password_confirmation") }>
            <Col componentClass={ControlLabel} xs={2}>
              パスワード（確認用）
            </Col>
            <Col xs={4}>
              <FormControl type="password" inputRef={ (ref) => { this.password_confirmation = ref } }/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xsOffset={2} xs={10}>
              <Button type="submit">
                サインアップ
              </Button>
            </Col>
          </FormGroup>
        </form>
        </Grid>
      </div>
    )
  }

  renderWelcome() {
    return(
      <div>
        <Well>
          <Grid>
            <h2>ユーザ登録</h2>
          </Grid>
        </Well>
        <Grid>
          <Message />
          <div className="jumbotron">
            <p>登録ありがとうございます！</p>
          </div>
        </Grid>
      </div>
    )
  }

  render(){
    if(Auth.isAuthorized()){
      return(<Redirect to="/" />)
    }else{
      return(this.renderForm())
    }
  }
}

SignUp.propTypes = {
  response: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
}
