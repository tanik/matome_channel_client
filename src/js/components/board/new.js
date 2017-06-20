import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class NewBoard extends Component {
  constructor(props) {
    super(props)
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
    this.props.postBoard(category_id, title,  name, content)
  }

  renderModal(){
    return(
      <Modal show={ this.props.show } onHide={ this.props.closeNewBoardModal }>
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
                { this.props.categories.map( (category) => {
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
          <Button onClick={ this.props.closeNewBoardModal }>閉じる</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    if(this.props.post_board_result.state == "success"){
      this.props.clearPostResult()
      return(<Redirect to={`/boards/${this.props.post_board_result.response.id}`} />)
    }else{
      return(this.renderModal())
    }
  }
}

NewBoard.propTypes = {
  show: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  post_board_result: PropTypes.object.isRequired,
  postBoard: PropTypes.func.isRequired,
  clearPostResult: PropTypes.func.isRequired,
  openNewBoardModal: PropTypes.func.isRequired,
  closeNewBoardModal: PropTypes.func.isRequired,
}
