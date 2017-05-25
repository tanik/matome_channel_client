import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import nl2br from 'react-nl2br'
import moment from 'moment'
import Time from 'react-time'

moment.locale('ja')

export default class Comment extends Component {
  constructor(props) {
    super(props)
  }

  reply(e){
    e.stopPropagation()
    this.props.reply(this.props.comment.num)
  }

  favorite(e){
    e.stopPropagation()
    if(this.isMyFavorite()){
      return
    }
    this.props.favorite(this.props.comment.board_id, this.props.comment.id)
  }

  showCommentDetail(){
    // TODO
  }
  
  isMyComment(){
    return(this.props.current_user_id == this.props.comment.user_id)
  }

  isMyFavorite(){
    return(this.props.comment.favorite_user_ids.includes(this.props.current_user_id))
  }

  render() {
    return(
      <div className="comment" onClick={ this.showCommentDetail }>
        <Grid>
        <Row className="comment-header">
          <Col xs={12}>
            <span className="comment-header-num">
              <strong>{ this.props.comment.num }</strong>
            </span>
            <span className="comment-header-name">
              <strong>{ this.isMyComment() ? "あなたです！" : this.props.comment.name }</strong>
            </span>
            <span className="comment-header-created_at">
              <Time value={ new Date(this.props.comment.created_at) }
                format="YYYY[年]MM[月]DD[日] (dddd) HH:mm:ss"/>
            </span>
            <span className="comment-header-hash_id">
              ID: { this.props.comment.hash_id }
            </span>
          </Col>
        </Row>
        <Row className="comment-body">
          <Col xs={12}>
            { nl2br(this.props.comment.content) }
          </Col>
        </Row>
        <Row className="comment-tools">
          <Col xs={1} className="comment-tools-reply">
            <button onClick={ this.reply.bind(this) }>
              <Glyphicon glyph="share-alt" />
            </button>
          </Col>
          <Col xs={1} className={ this.isMyFavorite() ? "comment-tools-favorite  my-favorite" : "comment-tools-favorite" }>
            <button onClick={ this.favorite.bind(this) }>
              <Glyphicon glyph="heart" />
              <span className="button-text">{ this.props.comment.favorite_user_ids.length }</span>
            </button>
          </Col>
        </Row>
        </Grid>
      </div>
    )
  }
}

Comment.propTypes = {
  current_user_id: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  favorite: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
}
