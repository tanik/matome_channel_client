import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Row, Col, Well, Tabs, Tab } from 'react-bootstrap';
import Comment from '../comment/comment';
import NewComment from '../comment/new';
import BoardCable from '../../cable/board'

export default class ShowBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.getBoard()
    this.sub = new BoardCable(this.getID(), this.cable_dispather.bind(this))
  }

  componentWillUnmount(){
    this.sub.unsubscribe()
  }

  cable_dispather(data){
    switch(data.action) {
      case "comment_added": {
        this.props.addComment(data.comment)
        return
      }
      default:{
        console.warn("unknown action: ", data)
        return
      }
    }
  }

  getID(){
    if(this.props.match.params.id){
      return Number(this.props.match.params.id)
    }else{
      // for test
      return 1
    }
  }

  getBoard() {
    this.props.getBoard(this.getID())
  }

  comments(){
    return(this.props.board.comments || [])
  }

  newComment(){
    this.new_comment_dialog.open()
  }

  render() {
    return(
      <div className="board-show">
        <Well className="board-show-header">
          <Grid>
            <div className="clearfix">
              <strong className="pull-left">カテゴリ：</strong>
              <div className="pull-left">{ /* TODO */ }</div>
            </div>
            <h1>{ this.props.board.title }</h1>
            <button onClick={ this.newComment.bind(this) }>New Comment</button>
          </Grid>
        </Well>
        <Grid>
          <Row>
            <Col xs={8}>
              <div className="board-show-body">
                <Tabs defaultActiveKey={ "comment" } bsStyle="pills" id="noanim-tab-example">
                  <Tab eventKey={ "comment" } title="コメント">
                    { this.comments().map( comment =>
                      <Comment key={comment.id} comment={comment} />
                    ) }
                  </Tab>
                  <Tab eventKey={ "web" } title="WEBサイト">
                  </Tab>
                  <Tab eventKey={ "image" } title="画像">
                  </Tab>
                  <Tab eventKey={ "movie" } title="動画">
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col xs={4}>
              Side Menu そのうち作る。
            </Col>
          </Row>
        </Grid>
        <NewComment ref={ ref => { this.new_comment_dialog = ref} }
          board_id={ this.getID() }
          show={ false }/>
      </div>
    )
  }
}

ShowBoard.propTypes = {
  board: PropTypes.object.isRequired,
  getBoard: PropTypes.func.isRequired
}
