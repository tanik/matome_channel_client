import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CategoryList from '../../containers/category/list'
import Board from '../../components/board/board'
import NewBoard from '../../containers/board/new'
import { Grid, Well, Pagination, Glyphicon } from 'react-bootstrap';

export default class BoardList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.getBoards()
  }

  componentDidUpdate (prevProps) {
    // 我ながらなんの処理でいれたのか謎、なんかおかしい気がするのでコメントアウトしとく。
    //if (this.props.location.pathname.match(/\/boards\/\d+/)) {
    //  this.props.history.push(this.selectedCategoryID())
    //} else if (prevProps.location.pathname !== this.props.location.pathname) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getBoards(1)
    }
  }

  getBoards(page, per) {
    page = page || this.props.page
    per = per || this.props.per
    this.props.getBoards(page, per, this.selectedCategoryID(), this.props.match.params.query)
  }

  selectedCategoryID(){
    if(this.props.match && this.props.match.params && this.props.match.params.id){
      return Number(this.props.match.params.id)
    }else{
      return 0
    }
  }

  changePage(page){
    this.getBoards(page)
  }

  render(){
    return(
      <div>
        <Well className="board-title">
          <Grid>
            <h2>スレッド一覧</h2>
            <div className="board-tool-box pull-right">
              <button className="new-button"
                onClick={ this.props.openNewBoardModal }
                title="新規スレッド">
                <Glyphicon glyph="pencil" />
                <span className="button-text">新規スレッド</span>
              </button>
            </div>
          </Grid>
        </Well>
        <CategoryList
          url_suffix={ '/boards' }
        />
        <Grid className='board-list'>
          { this.props.boards.map( board =>
            <Board key={`board-${board.id}`} board={board} />
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
        <NewBoard />
      </div>
    )
  }
}

BoardList.propTypes = {
  boards: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  per: PropTypes.number.isRequired,
  total_page: PropTypes.number.isRequired,
  next_page: PropTypes.number,
  prev_page: PropTypes.number,
  getBoards: PropTypes.func.isRequired,
  openNewBoardModal: PropTypes.func.isRequired,
}
