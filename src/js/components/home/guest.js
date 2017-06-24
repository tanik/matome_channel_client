import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Grid,
  Well,
} from 'react-bootstrap';
import Board from '../../components/board/board'
import Comment from '../../components/comment/comment';
import CategoryList from '../../containers/category/list'

export default class GuestHome extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const category_id = this.selectedCategoryID()
    this.props.getPopularBoards(category_id)
    this.props.getPopularComments(category_id)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const category_id = this.selectedCategoryID()
      this.props.getPopularBoards(category_id)
      this.props.getPopularComments(category_id)
    }
  }

  selectedCategoryID(){
    if(this.props.match && this.props.match.params && this.props.match.params.id){
      return Number(this.props.match.params.id)
    }else{
      return 0
    }
  }

  renderBoards(){
    if(this.props.boards.length > 0){
      return(
        this.props.boards.map( (board) =>
          <Board key={ `board-${board.id}` } board={board} />
        )
      )
    }else{
      return(
        <h4>
          話題のスレッドはないみたいです…
        </h4>
      )
    }
  }

  renderComments(){
    if(this.props.comments.length > 0){
      return(
        this.props.comments.map( (comment) => {
          const board_url = `/boards/${comment.board.id}`
          const comment_content = (
            <Comment key={ `board-comment-${comment.board.id}-${comment.id}`}
              comment={comment}
              favorite={ () => { this.props.history.push(board_url) } }
              reply={ () => { this.props.history.push(board_url) } }
              showCommentModal={ () => {} } />
          )
          return(
            <Board
              key={ `board-${comment.board.id}-${comment.id}` }
              board={comment.board}
              content={ comment_content }
            />
          )
        })
      )
    }else{
      return(
        <h4>
          話題のコメントはないみたいです…
        </h4>
      )
    }
  }

  render(){
    return(
      <div className="home">
        <Well className="home-header">
          <Grid>
            <h3>ようこそ、まとめちゃんねるへ！</h3>
          </Grid>
        </Well>
        <CategoryList
          url_suffix={ '' }
        />
        <Grid className="home-body">
          <div className='home-body-title'>
            <h3>話題のコメント</h3>
          </div>
          <div className='board-list'>
            { this.renderComments() }
          </div>
          <div className='home-body-title'>
            <h3>話題のスレッド</h3>
          </div>
          <div className='board-list'>
            { this.renderBoards()  }
          </div>
        </Grid>
      </div>
    )
  }
}

GuestHome.propTypes = {
  boards: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  getPopularBoards: PropTypes.func.isRequired,
  getPopularComments: PropTypes.func.isRequired,
}
