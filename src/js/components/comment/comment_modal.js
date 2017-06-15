import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, ProgressBar } from 'react-bootstrap'
import Comment from './comment'

export default class CommentModal extends Component {
  constructor(props) {
    super(props)
  }

  renderComments(){
    if(this.props.comment.id){
      return(
        <div>
          <Comment key={this.props.comment.id}
            comment={this.props.comment}
            favorite={ this.props.favorite.bind(this) }
            reply={ this.props.reply.bind(this) }
            showCommentModal={ this.props.showCommentModal }
          />
          <div className='relation-title'>関連レス</div>
          { this.props.related_comments.map( (comment) =>
            <Comment key={comment.id}
              comment={ comment }
              favorite={ this.props.favorite.bind(this) }
              reply={ this.props.reply.bind(this) }
              showCommentModal={ this.props.showCommentModal }
            />
          )}
        </div>
      )
    }else{
      return(<ProgressBar active now={100}/>)
    }
  }

  render(){
    return(
      <Modal show={ this.props.show } onHide={ this.props.close }>
        <Modal.Header closeButton>
          <Modal.Title>コメント</Modal.Title>
        </Modal.Header>
        <Modal.Body className='comment-modal-body'>
          { this.renderComments() }
        </Modal.Body>
      </Modal>
    )
  }
}

CommentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  comment: PropTypes.object.isRequired,
  related_comments: PropTypes.array.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  changeComments: PropTypes.func.isRequired,
  getRelatedCommentsAsync: PropTypes.func.isRequired,
  getCommentsByNumAsync: PropTypes.func.isRequired,
  // not redux props
  board_id: PropTypes.number,
  favorite: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  showCommentModal: PropTypes.func.isRequired,
}
