import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CategoryList from '../../components/board/category_list'
import Board from '../../components/board/board'
import NewBoard from '../../components/board/new'
import { Grid, Well } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'


export default class BoardList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.changeCategory(this.selectedCategoryID())
    this.props.getCategories()
    this.getBoards()
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname.match(/\/boards\/\d+/)) {
      this.props.history.push(this.selectedCategoryID())
    } else if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.changeCategory(this.selectedCategoryID())
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
      return 0
    }
  }

  categories() {
    return( this.props.categories || [])
  }

  selectedCategory(){
    let selected_id = this.selectedCategoryID()
    return(this.props.categories.find( category => {
      return(category.id == selected_id)
    }))
  }

  openNewBoardDialog() {
    this.new_board_dialog.open()
  }

  post(category_id, title,  name, content){
    this.props.postBoard(category_id, title,  name, content)
  }

  renderBoardList(){
    return(
      <div>
        <Well className="board-title">
          <Grid>
            <h2>スレッド一覧</h2>
            <button onClick={ this.openNewBoardDialog.bind(this) }>New Board</button>
          </Grid>
        </Well>
        <CategoryList
          getCategories={ this.categories.bind(this) }
          selectedCategory={ this.selectedCategory.bind(this) }
        />
        <Grid>
        { this.props.boards.map( board =>
          <Board key={board.id} board={board} />
        ) }
        </Grid>
        <NewBoard
          getCategories={ this.categories.bind(this) }
          post={ this.post.bind(this) }
          ref={ (ref) => this.new_board_dialog = ref }
        />
      </div>
    )
  }

  render() {
    if(this.props.post_board_result.state == "success"){
      return(<Redirect to={`/boards/${this.props.post_board_result.response.id}`} />)
    }else{
      return(this.renderBoardList())
    }
  }
}

BoardList.propTypes = {
  boards: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  per: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  selected_category_id: PropTypes.number.isRequired,
  post_board_result: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getBoards: PropTypes.func.isRequired,
  postBoard: PropTypes.func.isRequired,
}
