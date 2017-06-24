import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Well, Pagination } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom'
import Auth from '../../utils/auth'
import Comment from '../../components/comment/comment'

export default class MyComments extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(Auth.isAuthorized()){
      this.getMyComments()
    }
  }

  getMyComments(page, per) {
    page = page || this.props.page
    per = per || this.props.per
    this.props.getMyComments(this.props.type, page, per)
  }

  changePage(page){
    this.getMyComments(page)
  }

  title(){
    if(this.props.type == 'comments'){
      return("書き込みコメント一覧")
    }else{
      return("お気に入りコメント一覧")
    }
  }

  render(){
    if(Auth.isAuthorized()){
      return(
        <div>
          <Well className="my-comments-title">
            <Grid>
              <h2>{ this.title() }</h2>
            </Grid>
          </Well>
          <Grid className='my-comments-list'>
            { this.props.comments.map( comment =>
              <div key={ `my-comment-${comment.id}` }>
                <h5>スレッド: <Link to={ `/boards/${comment.board.id}` }>{ comment.board.title }</Link></h5>
                <Comment
                  comment={comment}
                  favorite={ () => { this.props.history.push(`/boards/${comment.board.id}`) } }
                  reply={ () => { this.props.history.push(`/boards/${comment.board.id}`) } }
                  showCommentModal={ () => {} } />
              </div>
            ) }
            <Pagination
              prev
              next
              first
              last
              boundaryLinks
              items={ this.props.total_page }
              maxButtons={5}
              activePage={ this.props.page }
              onSelect={ this.changePage.bind(this) } />
          </Grid>
        </div>
      )
    }else{
      return( <Redirect to={'/login'} /> )
    }
  }
}

MyComments.propTypes = {
  comments: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  per: PropTypes.number.isRequired,
  total_page: PropTypes.number.isRequired,
  next_page: PropTypes.number,
  prev_page: PropTypes.number,
  getMyComments: PropTypes.func.isRequired,
  // not redux props
  type: PropTypes.string.isRequired,
}
