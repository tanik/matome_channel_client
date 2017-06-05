import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Row, Col, Well, Glyphicon, Breadcrumb, Thumbnail, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Gallery from 'react-photo-gallery';
import Comment from '../../components/comment/comment';
import NewComment from '../../components/comment/new';
import BoardCable from '../../cable/board'
import Auth from '../../utils/auth';
import InfiniteScroll from 'react-infinite-scroll-component'

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

  shouldComponentUpdate (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      return(true)
    }else{
      return this.props !== nextProps
    }
  }

  cable_dispather(data){
    switch(data.action) {
      case "comment_added": {
        this.props.addComment(data.comment)
        return
      }
      case "board_image_added": {
        this.props.addBoardImage(data.board_image)
        return
      }
      case "board_website_added": {
        this.props.addBoardWebsite(data.board_website)
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

  getMoreComment(){
    const board_id = this.getID()
    const comments = this.comments()
    const last_comment = comments[comments.length-1]
    if( last_comment ){
      this.props.getComments(board_id, undefined, last_comment.id)
    }
  }

  renderComments(){
    const comments = this.comments()
    if(comments.length > 0){
      const hasMore = (comments[comments.length-1].num != 1)
      return(
        <InfiniteScroll
          next={ this.getMoreComment.bind(this) }
          hasMore={ hasMore }
          loader={ <ProgressBar active now={100} /> }
          endMessage={ <div></div> } >
          { comments.map( comment => {
            return(
              <Comment key={comment.id}
                current_user_id={ this.props.board.current_user_id }
                comment={comment}
                favorite={ this.favoriteComment.bind(this) }
                reply={ this.reply.bind(this) }
              />
            )
          })}
        </InfiniteScroll>
      )
    }else{
      return(<div>コメントがありません。</div>)
    }
  }

  renderWebsites(){
    const websites = (this.props.board.websites || [])
    return(
      <ul className="list-inline">
      {websites.map( website => {
        return(
          <li key={ `website-${website.id}` }>
            <h5><Link to={ website.website.original_url }>{ website.website.title }</Link></h5>
            <Thumbnail target="_BLANK" href={website.website.full_url} src={website.website.thumbnail_url} />
          </li>
        )
      }) }
      </ul>
    )
  }

  renderImages(){
    const images = (this.props.board.images || [])
    const photo_sets = images.map( image => {
      return({
        src: image.image.full_url,
        srcset: [
          image.image.thumbnail_url
        ],
        width: image.image.width,
        height: image.image.height,
      })
    })
    return(
      <Gallery
        photos={photo_sets}
        margin={1}
        cols={4}
        onClickPhoto={this.openImage.bind(this)}/>
    )
  }

  openImage(index, event){
    event.preventDefault();
    window.open(this.props.board.images[index].image.full_url)
  }

  renderMovies(){
    return(<div className="alert alert-warning">未実装なのだ・・・。</div>)
  }

  renderContent(){
    let target
    let renderFunc
    if(this.props.match.url == `/boards/${this.getID()}`){
      target = "comments"
      renderFunc = this.renderComments.bind(this)
    }else if(this.props.match.url == `/boards/${this.getID()}/websites`){
      target = "websites"
      renderFunc = this.renderWebsites.bind(this)
    }else if(this.props.match.url == `/boards/${this.getID()}/images`){
      target = "images"
      renderFunc = this.renderImages.bind(this)
    }else{
      target = null
      renderFunc = () => {
        return(<h5>そんなページはありません！</h5>)
      }
    }
    return(
      <div>
        <ul className="nav nav-pills board-show-body-header">
          <li role="presentation" className={ target == 'comments' ? 'active' : '' }>
            <Link to={`/boards/${this.getID()}`}>コメント</Link>
          </li>
          <li role="presentation" className={ target == 'websites' ? 'active' : '' }>
            <Link to={`/boards/${this.getID()}/websites`}>WEBサイト</Link>
          </li>
          <li role="presentation" className={ target == 'images' ? 'active' : '' }>
            <Link to={`/boards/${this.getID()}/images`}>画像</Link>
          </li>
        </ul>
        <div className='board-show-body-content'>
          { renderFunc() }
        </div>
      </div>
    )
  }

  renderCategory(){
    const tree = this.props.board.category_tree || []
    return(
      <Breadcrumb className="category-box">
      {
        tree.map( category => {
          return(
            <Breadcrumb.Item
              key={ `category-${category.id}` }
              href={ `/categories/${category.id}/boards` }>
              { category.name }
            </Breadcrumb.Item>
          )
        })
      }
      </Breadcrumb>
    )
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
              <div className="pull-left">
                { this.renderCategory() }
              </div>
              <div className="board-tool-box pull-right">
                <button className="score"
                  title="スコア">
                  <Glyphicon glyph="star" />
                  <span className="button-text">{ this.props.board.score }</span>
                </button>
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
            <h3>{ this.props.board.title }</h3>
          </Grid>
        </Well>
        <Grid>
          <Row>
            <Col xs={9}>
              <div className="board-show-body">
                { this.renderContent() }
              </div>
            </Col>
            <Col xs={3}>
              <div className='board-show-sidemenu'>
                Side Menu そのうち作る。
              </div>
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
  getComments: PropTypes.func.isRequired,
  setFavoriteBoard: PropTypes.func.isRequired,
  setFavoriteComment: PropTypes.func.isRequired,
  changeFavoriteBoard: PropTypes.func.isRequired,
  changeFavoriteComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  addCommentImage: PropTypes.func.isRequired,
  addCommentWebsite: PropTypes.func.isRequired,
}
