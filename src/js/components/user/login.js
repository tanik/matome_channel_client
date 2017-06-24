import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Grid, Well, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  login(e){
    e.preventDefault();
    this.props.login(this.email.value, this.password.value)
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
            <h2>ログイン</h2>
          </Grid>
        </Well>
        <Grid>
        <form className="form-horizontal" onSubmit={ this.login.bind(this) }>
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
          <FormGroup>
            <Col xsOffset={0} xs={12} smOffset={3} sm={9}>
              <Button type="submit">
                ログイン
              </Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xsOffset={0} xs={12} smOffset={3} sm={9}>
              <Link to="/sign_up">新規登録はこちらから</Link>
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

Login.propTypes = {
  response: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
}
