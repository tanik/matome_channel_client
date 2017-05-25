import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class NewBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({show: false})
  }

  open(){
    this.setState({show: true})
  }

  close(){
    this.setState({show: false})
  }

  post(e){
    e.preventDefault()
    const category_id = this.board_category.value
    const title = this.board_title.value.trim()
    const name = this.comment_name.value.trim()
    const content = this.comment_content.value.trim()
    if(title.length == 0 || content.length == 0){
      return
    }
    this.props.post(category_id, title,  name, content)
  }

  render() {
    return(
      <Modal show={ this.state.show } onHide={ this.close.bind(this) }>
        <Modal.Header closeButton>
          <Modal.Title>スレッド作成</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ this.post.bind(this) }>
            <FormGroup controlId="formControlsCategory">
              <ControlLabel>カテゴリ</ControlLabel>
              <FormControl componentClass="select"
                placeholder="カテゴリ"
                inputRef={ ref => { this.board_category = ref }}>
                { this.props.getCategories().map( (category) => {
                  return(<option key={category.id} value={ category.id }>{ category.nested_name }</option>)
                })}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsTitle">
              <ControlLabel>タイトル</ControlLabel>
              <FormControl type="text"
                placeholder="タイトルを入力してね！"
                inputRef={ ref => { this.board_title = ref } }
                required/>
            </FormGroup>
            <FormGroup controlId="formControlsName">
              <ControlLabel>名前</ControlLabel>
              <FormControl type="text"
                placeholder="名無しさん"
                inputRef={ ref => { this.comment_name = ref } }/>
            </FormGroup>
            <FormGroup controlId="formControlsContent">
              <ControlLabel>コメント</ControlLabel>
              <FormControl componentClass="textarea"
                placeholder=""
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

NewBoard.propTypes = {
  getCategories: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
}
