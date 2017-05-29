import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Row, Col, Well, Tabs, Tab, Glyphicon } from 'react-bootstrap';
import Comment from '../../components/comment/comment';
import NewComment from '../../components/comment/new';
import BoardCable from '../../cable/board'
import Auth from '../../utils/auth';

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
      case "comment_image_added": {
        this.props.addCommentImage(data.comment_image)
        return
      }
      case "comment_website_added": {
        this.props.addCommentWebsite(data.comment_website)
        return
      }
      case "comment_favorited": {
        this.props.changeFavoriteComment(data.favorite)
        return
      }
      case "board_favorited": {
        this.props.changeFavoriteBoard(data.favorite)
        return
      }
      default:{
        console.warn("unknown action: ", data)
        return
      }
    }
  }

  getID(){
    return Number(this.props.match.params.id)
  }

  getBoard() {
    this.props.getBoard(this.getID())
  }

  comments(){
    return(this.props.board.comments || [])
  }

  openNewComment(e){
    e.preventDefault()
    this.new_comment.open()
  }

  reply(num){
    this.new_comment.setContent(`>>${num}\n`)
    this.new_comment.open()
  }

  favoriteComment(board_id, comment_id){
    if(Auth.isAuthorized()){
      this.props.setFavoriteComment(board_id, comment_id)
    }else{
      this.props.history.push("/login")
    }
  }

  favoriteBoard(){
    if(Auth.isAuthorized()){
      if(!this.isMyFavorite()){
        this.props.setFavoriteBoard(this.getID())
      }
    }else{
      this.props.history.push("/login")
    }
  }

  postComment(name, content){
    this.props.postComment(this.props.board.id, name, content)
  }

  favoriteUserCount(){
    if(this.props.board.favorite_user_ids){
      return this.props.board.favorite_user_ids.length
    }else{
      return 0
    }
  }

  isMyFavorite(){
    const favorite_user_ids = (this.props.board.favorite_user_ids || [])
    return(favorite_user_ids.includes(this.props.board.current_user_id))
  }

  renderComments(){
    if(this.comments().length > 0){
      return(
        this.comments().map( comment =>
          <Comment key={comment.id}
            current_user_id={ this.props.board.current_user_id }
            comment={comment}
            favorite={ this.favoriteComment.bind(this) }
            reply={ this.reply.bind(this) }
          />
        )
      )
    }else{
      return(<div>コメントがありません。</div>)
    }
  }

  renderWebsites(){
    return(<div className="alert alert-warning">未実装なのだ・・・。</div>)
  }

  renderImages(){
    return(<div className="alert alert-warning">未実装なのだ・・・。</div>)

  }

  renderMovies(){
    return(<div className="alert alert-warning">未実装なのだ・・・。</div>)
  }

  render() {
    if(this.props.post_comment_result.state == "success"){
      this.new_comment.close()
    }
    return(
      <div className="board-show">
        <Well className="board-show-header">
          <Grid>
            <div className="clearfix">
              <strong className="pull-left">カテゴリ：</strong>
              <div className="board-tool-box pull-right">
                <button className={ this.isMyFavorite() ? "favorite-button my-favorite" : "favorite-button" }
                  onClick={ this.favoriteBoard.bind(this) }
                  title="お気に入り">
                  <Glyphicon glyph="heart" />
                  <span className="button-text">{ this.favoriteUserCount() }</span>
                </button>
                <button className="new-button"
                  onClick={ this.openNewComment.bind(this) }
                  title="コメントを書き込む">
                  <Glyphicon glyph="pencil" />
                  <span className="button-text">コメントする</span>
                </button>
              </div>
            </div>
            <h2>{ this.props.board.title }</h2>
          </Grid>
        </Well>
        <Grid>
          <Row>
            <Col xs={8}>
              <div className="board-show-body">
                <Tabs defaultActiveKey={ "comment" } bsStyle="pills" id="noanim-tab-example">
                  <Tab eventKey={ "comment" } title="コメント">
                    { this.renderComments() }
                  </Tab>
                  <Tab eventKey={ "web" } title="WEBサイト">
                    { this.renderWebsites() }
                  </Tab>
                  <Tab eventKey={ "image" } title="画像">
                    { this.renderImages() }
                  </Tab>
                  <Tab eventKey={ "movie" } title="動画">
                    { this.renderMovies() }
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col xs={4}>
              Side Menu そのうち作る。
            </Col>
          </Row>
        </Grid>
        <NewComment
          postComment={ this.postComment.bind(this) }
          ref={ (ref) => this.new_comment = ref }/>
      </div>
    )
  }
}

ShowBoard.propTypes = {
  board: PropTypes.object.isRequired,
  post_comment_result: PropTypes.object.isRequired,
  getBoard: PropTypes.func.isRequired,
  setFavoriteBoard: PropTypes.func.isRequired,
  setFavoriteComment: PropTypes.func.isRequired,
  changeFavoriteBoard: PropTypes.func.isRequired,
  changeFavoriteComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  addCommentImage: PropTypes.func.isRequired,
  addCommentWebsite: PropTypes.func.isRequired,
}
