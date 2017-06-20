import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class NewComment extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({content: ''})
  }

  componentDidUpdate (prevProps) {
    if(prevProps.content != this.props.content){
      this.setState({content: this.props.content})
    }
  }

  close(){
    this.setState({content: ''})
    this.props.closeNewCommentModal()
  }


  post(e){
    e.preventDefault()
    let name = this.comment_name.value.trim()
    let content = this.comment_content.value.trim()
    if(content.length == 0){
      return
    }
    this.props.postComment(this.props.board_id, name, content)
  }

  handleContentChange(e) {
    this.setState({content: e.target.value})
  }

  render() {
    return(
      <Modal show={ this.props.show } onHide={ this.close.bind(this) }>
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
  show: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  openNewCommentModal: PropTypes.func.isRequired,
  closeNewCommentModal: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  // not redux props
  board_id: PropTypes.number.isRequired,
}
