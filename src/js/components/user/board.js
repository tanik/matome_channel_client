import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Well, Pagination } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Auth from '../../utils/auth'
import Board from '../../components/board/board'

export default class MyBoards extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.getMyBoards()
  }

  getMyBoards(page, per) {
    page = page || this.props.page
    per = per || this.props.per
    this.props.getMyBoards(this.props.type, page, per)
  }

  changePage(page){
    this.getMyBoards(page)
  }

  title(){
    if(this.props.type == 'boards'){
      return("作成スレッド一覧")
    }else if(this.props.type == 'favorite_boards'){
      return("お気に入りスレッド一覧")
    }else{
      return("スレッド閲覧履歴")
    }
  }

  render(){
    if(Auth.isAuthorized()){
      return(
        <div>
          <Well className="board-title">
            <Grid>
              <h2>{ this.title() }</h2>
            </Grid>
          </Well>
          <Grid className='my-boards board-list'>
            { this.props.boards.map( board =>
              <Board key={board.id} board={board} />
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

MyBoards.propTypes = {
  boards: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  per: PropTypes.number.isRequired,
  total_page: PropTypes.number.isRequired,
  next_page: PropTypes.number,
  prev_page: PropTypes.number,
  getMyBoards: PropTypes.func.isRequired,
  // not redux props
  type: PropTypes.string.isRequired,
}
