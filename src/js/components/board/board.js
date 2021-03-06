import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Well, Thumbnail, Glyphicon } from 'react-bootstrap';

export default class Board extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Well bsSize="sm" className="">
        <Grid>
          <Row>
            <Col xs={12} sm={3}>
              <Link to={ `/boards/${ this.props.board.id }` } title={ this.props.board.title } >
                <Thumbnail src={ this.props.board.thumbnail_url } />
              </Link>
            </Col>
            <Col className='board' xs={12} sm={8}>
              <div className="header">
                <span className="score" title="スコア">
                  <Glyphicon glyph='star' className='icon-white' />
                  <strong>{ this.props.board.score }</strong>
                </span>
                <span className="res-count" title="レス数">
                  <Glyphicon glyph='pencil' className='icon-white' />
                  <strong>{ this.props.board.res_count }</strong>
                </span>
                <span className="favorites-count" title="お気に入り登録数">
                  <Glyphicon glyph='heart' className='icon-white' />
                  <strong>{ this.props.board.fav_count }</strong>
                </span>
              </div>
              <h3 className="title">
              <Link to={ `/boards/${ this.props.board.id }` } title={ this.props.board.title }>{ this.props.board.title }</Link>
              </h3>
              <div className='first-comment'>
                {
                  (() => {
                    if(this.props.content){
                      return(this.props.content)
                    }else{
                      return(this.props.board.first_comment)
                    }
                  })()
                }
              </div>
            </Col>
          </Row>
        </Grid>
      </Well>
    )
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  content: PropTypes.object
}
