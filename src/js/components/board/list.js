import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CategoryList from '../../containers/board/category_list'
import Board from '../../components/board/board'
import { Grid, Well } from 'react-bootstrap';


export default class BoardList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.getBoards()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getBoards();
    }
  }

  getBoards() {
    this.props.getBoards(this.props.page, this.props.per, this.selectedCategoryID())
  }

  selectedCategoryID(){
    if(this.props.match && this.props.match.params && this.props.match.params.id){
      return Number(this.props.match.params.id)
    }else{
      0
    }
  }

  render() {
    return(
      <div>
        <Well className="board-title">
          <Grid>
            <h2>スレッド一覧</h2>
          </Grid>
        </Well>
        <CategoryList />
        <Grid>
        { this.props.boards.map( board =>
          <Board key={board.id} board={board} />
        ) }
        </Grid>
      </div>
    )
  }
}

BoardList.propTypes = {
  boards: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  per: PropTypes.number.isRequired,
  getBoards: PropTypes.func.isRequired
}
