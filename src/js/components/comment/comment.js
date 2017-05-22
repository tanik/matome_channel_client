import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import nl2br from 'react-nl2br'
import moment from 'moment'
import Time from 'react-time'

moment.locale('ja')

export default class Board extends Component {
  constructor(props) {
    super(props)
  }

  reply(e){
    // TODO
    e.stopPropagation()
  }

  favorite(e){
    // TODO
    e.stopPropagation()
  }

  showCommentDetail(){
    // TODO
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
              <strong>{ this.props.comment.name }</strong>
            </span>
            <span className="comment-header-created_at">
              <Time value={ new Date(this.props.comment.created_at) }
                format="YYYY[年]MM[月]DD[日] (dddd) HH:mm:ss"/>
            </span>
            <span className="comment-header-hash_id">
              ID: aaaaaaaa
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
            <button onClick={ this.reply }>
              <Glyphicon glyph="share-alt" />
            </button>
          </Col>
          <Col xs={1} className="comment-tools-favorite">
            <button onClick={ this.favorite }>
              <Glyphicon glyph="heart" />
              <span className="button-text">1</span>
            </button>
          </Col>
        </Row>
        </Grid>
      </div>
    )
  }
}

Comment.propTypes = {
  Comment: PropTypes.object.isRequired
}
