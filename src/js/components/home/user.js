import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Grid,
  Well,
  Col,
  Panel,
  ProgressBar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Auth from '../../utils/auth'
import Comment from '../../components/comment/comment';
import BoardCable from '../../cable/board'

export default class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getMypageInfomations()
    this.sub = new BoardCable({user_id: Auth.currentUserId()}, this.cable_dispather.bind(this))
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
      default:{
        console.warn("unknown action: ", data)
        return
      }
    }
  }

  getMoreComments(){
    const comments = this.props.comments
    const lt_id = comments[comments.length-1].id
    this.props.getMoreComments(lt_id)
  }

  renderComments(){
    if(this.props.comments.length > 0){
      return(
        <InfiniteScroll
          next={ this.getMoreComments.bind(this) }
          hasMore={ this.props.has_more_comments }
          loader={ <ProgressBar active now={100} /> }
          endMessage={ "-" } >
        { this.props.comments.map( (comment) => {
          const board_url = `/boards/${comment.board.id}`
          return (
              <div key={ `board-comment-${comment.board.id}-${comment.id}` }>
                <h5>スレッド: <Link to={ board_url }>{ comment.board.title }</Link></h5>
                <Comment
                  showOptions={ {
                    num: true,
                    name: true,
                    created_at: true,
                    images: true,
                    websites: true,
                    toolbox: true,
                  } }
                  comment={ comment }
                  favorite={ () => { this.props.history.push(board_url) } }
                  reply={ () => { this.props.history.push(board_url) } }
                  showCommentModal={ () => {} } />
              </div>
          )
        }) }
        </InfiniteScroll>
      )
    }else{
      return(
        <div>
          <h4>
            タイムラインはまだ空みたいです…。
          </h4>
          <p>気に入ったスレッドをお気に入り登録しましょう！</p>
          <p>お気に入り登録されたスレッドに投稿されたコメントがタイムラインに表示されます！</p>
        </div>
      )
    }
  }

  renderPopulars(){
    if(this.props.populars.length > 0){
      return(
        this.props.populars.map( (comment) => {
          const board_url = `/boards/${comment.board.id}`
          return (
            <div key={ `popular-board-comment-${comment.board.id}-${comment.id}` }>
              <h5>スレッド: <Link to={ board_url }>{ comment.board.title }</Link></h5>
              <Comment
                showOptions={ {
                  num: true,
                  name: true,
                  toolbox: true,
                } }
                comment={comment}
                favorite={ () => { this.props.history.push(board_url) } }
                reply={ () => { this.props.history.push(board_url) } }
                showCommentModal={ () => {} } />
            </div>
          )
        })
      )
    }else{
      return(
        <div>
          話題のコメントはないみたいです…
        </div>
      )
    }
  }

  /* TODO
  renderRecommends(){
    if(this.props.recommends.length > 0){
      return(
        this.props.recommends.map( (board) => {
        })
      )
    }else{
      return(
        <div>
          お薦めのスレッドはないみたいです…
        </div>
      )
    }
  }
  */

  renderHistories(){
    if(this.props.histories.length > 0){
      return(
        <div>
          <ul className='home-user-histories'>
          { this.props.histories.map( (board) =>
            <li key={ `history-board-${board.id}` }>
              <Link to={ `/boards/${board.id}` }>{ board.title }</Link>
            </li>
          ) }
          </ul>
          <Link className='pull-right' to='/my/histories'>もっと見る</Link>
        </div>
      )
    }else{
      return(
        <div>
          閲覧履歴はないみたいです…
        </div>
      )
    }
  }


  renderContent(){
    if(this.props.loading){
      return(
        <div>
          <p>Loading...</p>
          <ProgressBar active now={100} />
        </div>
      )
    }else{
      return(
        <div>
          <Col xs={12} sm={8}>
            <div className='home-body-title'>
              <h3>タイムライン</h3>
            </div>
            <div className="home-user-timeline">
              { this.renderComments() }
            </div>
          </Col>
          <Col xs={12} sm={4}>
            <Panel header="話題のコメント">
              { this.renderPopulars() }
            </Panel>
            { /* TODO
            <Panel header="あなたにお薦めのスレッド">
              { this.renderRecommends() }
            </Panel>
            */}
            <Panel header="スレッドの閲覧履歴">
              { this.renderHistories() }
            </Panel>
          </Col>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="home">
        <Well className="home-header">
          <Grid>
            <h3>{ Auth.info().uid }さんのページ</h3>
          </Grid>
        </Well>
        <Grid className="home-user-body">
          { this.renderContent() }
        </Grid>
      </div>
    )
  }
}

UserHome.propTypes = {
  loading: PropTypes.bool.isRequired,
  has_more_comments: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  populars: PropTypes.array.isRequired,
  recommends: PropTypes.array.isRequired,
  histories: PropTypes.array.isRequired,
  getMypageInfomations: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addCommentImage: PropTypes.func.isRequired,
  addCommentWebsite: PropTypes.func.isRequired,
  changeFavoriteComment: PropTypes.func.isRequired,
  getMoreComments: PropTypes.func.isRequired,
}
