import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Well, Grid, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
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
          <FormGroup validationState={ this.isValid("email") }>
            <Col componentClass={ControlLabel} xs={12} sm={3}>
              メールアドレス
            </Col>
            <Col xs={12} sm={5}>
              <FormControl type="email" inputRef={ (ref) => { this.email = ref } }/>
            </Col>
          </FormGroup>
          <FormGroup validationState={ this.isValid("password") }>
            <Col componentClass={ControlLabel} xs={12} sm={3}>
              パスワード
            </Col>
            <Col xs={12} sm={5}>
              <FormControl type="password" inputRef={ (ref) => { this.password = ref } }/>
            </Col>
          </FormGroup>
          <FormGroup validationState={ this.isValid("password_confirmation") }>
            <Col componentClass={ControlLabel} xs={12} sm={3}>
              パスワード（確認用）
            </Col>
            <Col xs={12} sm={5}>
              <FormControl type="password" inputRef={ (ref) => { this.password_confirmation = ref } }/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xsOffset={0} xs={12} smOffset={3} sm={9}>
              <Button type="submit">
                サインアップ
              </Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xsOffset={0} xs={12} smOffset={3} sm={9}>
              <Link to="/login">アカウントをお持ちの方はこちらから</Link>
            </Col>
          </FormGroup>
        </form>
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
