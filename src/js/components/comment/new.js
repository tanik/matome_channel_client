import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class NewComment extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({show: false, content: ""})
  }

  open(){
    this.setState({show: true})
  }

  close(){
    this.setState({show: false, content: ""})
  }

  setContent(content){
    this.setState({content: content})
  }

  post(e){
    e.preventDefault()
    let name = this.comment_name.value.trim()
    let content = this.comment_content.value.trim()
    if(content.length == 0){
      return
    }
    this.props.postComment(name, content)
  }

  handleContentChange(e) {
    this.setState({content: e.target.value})
  }

  render() {
    return(
      <Modal show={ this.state.show } onHide={ this.close.bind(this) }>
        <Modal.Header closeButton>
          <Modal.Title>コメント書き込み</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ this.post.bind(this) }>
            <FormGroup controlId="formControlsName">
              <ControlLabel>名前</ControlLabel>
              <FormControl type="text"
                placeholder="名無しさん"
                rows="8"
                inputRef={ ref => { this.comment_name = ref } }/>
            </FormGroup>
            <FormGroup controlId="formControlsContent">
              <ControlLabel>コメント</ControlLabel>
              <FormControl componentClass="textarea"
                placeholder=""
                value={ this.state.content }
                onChange={ this.handleContentChange.bind(this) }
                rows="8"
                inputRef={ ref => { this.comment_content = ref } }
                required/>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.post.bind(this) } bsStyle="primary">投稿する</Button>
          <Button onClick={ this.close.bind(this) }>閉じる</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

NewComment.propTypes = {
  postComment: PropTypes.func.isRequired,
}
