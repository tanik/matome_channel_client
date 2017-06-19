import PropTypes from 'prop-types'
import React, { Component } from 'react'
import{ Link } from 'react-router-dom'
//import{ Grid } from 'react-bootstrap'
import { Navbar, Nav, NavItem, Breadcrumb } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

export default class CategoryList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.changeCategory(this.selectedCategoryID())
    this.props.getCategories()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.changeCategory(this.selectedCategoryID())
    }
  }

  selectedCategoryID(){
    if(this.props.match && this.props.match.params && this.props.match.params.id){
      return Number(this.props.match.params.id)
    }else{
      return 0
    }
  }

  rootCategories() {
    let roots = this.props.categories.filter( category => { if(!category.parent_id){ return(category) }} )
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
    return(this.props.categories.find( category => {
      return(category.id == this.selectedCategoryID())
    }))
  }

  selectedCategoryRoot(){
    const selected = this.selectedCategory()
    if(selected){
      if(selected.parent_id){
        return(this.props.categories.find( category => category.id == selected.parent_id ))
      }else{
        return(selected)
      }
    }
  }

  selectedChildCategories() {
    let selected = this.selectedCategory()
    if( !selected ){ return([]) }
    let target_id = ( selected.parent_id || selected.id)
    return(
      this.props.categories.filter( category => {
        if(target_id == category.parent_id){ return(category) }
      })
    )
  }

  renderRootCategory(category){
    return(
      <IndexLinkContainer
        key={ `category-${category.id}`}
        to={ `/categories/${category.id}${this.props.url_suffix}` }>
        <NavItem active={ this.isSelected(category) }>
          { category.name }
        </NavItem>
      </IndexLinkContainer>
    )
  }

  renderChildCategory(category){
    let selected = this.isSelected(category)
    if(selected){
      return(
        <Breadcrumb.Item
          key={ `category-${category.id}`}
          active>
          { category.name }
        </Breadcrumb.Item>
      )
    }else{
      return(
        <IndexLinkContainer
          key={ `category-${category.id}`}
          to={ `/categories/${category.id}${this.props.url_suffix}` }>
          <Breadcrumb.Item>
            { category.name }
          </Breadcrumb.Item>
        </IndexLinkContainer>
      )
    }
  }

  render() {
    return(
      <div>
        <Navbar className="category-root">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={ this.props.url_suffix } className="navbar-brand">カテゴリ</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              { this.rootCategories().map( category => this.renderRootCategory(category) )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="category-child container">
          { (() => {
              if(this.selectedCategory()){
                return(
                  <Breadcrumb>
                    <span className="parent text-muted">{ this.selectedCategoryRoot().name } » </span>
                    { this.selectedChildCategories().map( category => this.renderChildCategory(category) )}
                  </Breadcrumb>
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
  getCategories: PropTypes.func.isRequired,
  changeCategory: PropTypes.func.isRequired,
  // not redux props
  url_suffix: PropTypes.string.isRequired,
}
