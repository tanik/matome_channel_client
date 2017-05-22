import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { MatomeChannel } from '../../utils/matome_channel'

export default class NewComment extends Component {
  constructor(props) {
    super(props)
    this.state = {show: props.show};
  }

  open(){
    this.setState({show: true})
  }

  close(){
    this.setState({show: false})
  }

  post(){
    let self = this
    MatomeChannel.Comment.create(this.props.board_id,{
      content: this.comment_input.value
    }).then( () =>
      self.close()
    )
  }

  render() {
    return(
      <Modal show={ this.state.show } onHide={ this.close.bind(this) }>
        <Modal.Header closeButton>
          <Modal.Title>コメント書き込み</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>コメント</ControlLabel>
              <FormControl componentClass="textarea"
                placeholder=""
                rows="8"
                inputRef={ ref => { this.comment_input = ref } }/>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.post.bind(this) } bsStyle="primary">投稿する</Button>
          <Button onClick={ this.close.bind(this) }>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

NewComment.propTypes = {
  board_id: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired
}
