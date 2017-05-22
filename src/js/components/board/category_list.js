import PropTypes from 'prop-types'
import React, { Component } from 'react'
import{ Link } from 'react-router-dom'
//import{ Grid } from 'react-bootstrap'

export default class CategoryList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.getCategoryList()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.changeCategory(this.props.match.params.id)
    }
  }

  getCategoryList() {
    this.props.getCategoryList()
  }

  categories() {
    return( this.props.categories || [])
  }

  rootCategories() {
    let roots = this.categories().filter( category => { if(!category.parent_id){ return(category) }} )
    return roots
  }

  isSelected(category){
    let selected = this.selectedCategory()
    if( !selected ){ return(false) }
    if( category.id == selected.id || category.id == selected.parent_id){
      return(true)
    }else{
      return(false)
    }
  }

  selectedCategory(){
    let selected_id = this.props.selected_category_id
    return(this.categories().find( category => {
      return(category.id == selected_id)
    }))
  }

  selectedChildCategories() {
    let selected = this.selectedCategory()
    if( !selected ){ return([]) }
    let target_id = ( selected.parent_id || selected.id)
    return(
      this.categories().filter( category => {
        if(target_id == category.parent_id){ return(category) }
      })
    )
  }

  renderRootCategory(category){
    let selected = this.isSelected(category)
    let className = selected ? "active" : ""
    return(
      <li key={ category.id } className={ className }>
        <Link to={ `/categories/${category.id}/boards` }>
          { category.name }
        </Link>
      </li>
    )
  }

  renderChildCategory(category){
    let selected = this.isSelected(category)
    if(selected){
      return(<li key={ category.id } className="active">{ category.name }</li>)
    }else{
      return(
        <li key={ category.id }>
          <Link to={ `/categories/${category.id}/boards` }>
            { category.name }
          </Link>
        </li>
      )
    }
  }

  render() {
    return(
      <div>
        <div className="board-category-root">
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <span className="navbar-brand">カテゴリ</span>
              </div>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  { this.rootCategories().map( category => this.renderRootCategory(category) )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="board-category-child container">
          { (() => {
              if(this.selectedCategory()){
                return(
                    <ol className="breadcrumb">
                      <span>サブカテゴリ: </span>
                      { this.selectedChildCategories().map( category => this.renderChildCategory(category) )}
                    </ol>
                )
              }
            })()
          }
        </div>
      </div>
    )
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  selected_category_id: PropTypes.number.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  changeCategory: PropTypes.func.isRequired,
}
