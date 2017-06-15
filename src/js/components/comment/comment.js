import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Glyphicon, Thumbnail } from 'react-bootstrap'
import Autolinker from 'autolinker'
import moment from 'moment'
import Time from 'react-time'
import Interweave from 'interweave';
import AnchorMatcher from '../../utils/interweave/anchor_matcher'
import Auth from '../../utils/auth'

moment.locale('ja')

export default class Comment extends Component {
  constructor(props) {
    super(props)
  }

  reply(e){
    e.stopPropagation()
    this.props.reply(this.props.comment.num)
  }

  favorite(e){
    e.stopPropagation()
    if(this.isMyFavorite()){
      return
    }
    this.props.favorite(this.props.comment.board_id, this.props.comment.id)
  }

  showCommentDetail(){
    this.props.showCommentModal({comment: this.props.comment})
  }
  
  isMyComment(){
    const current_user_id = Auth.currentUserId()
    return(current_user_id && current_user_id == this.props.comment.user_id)
  }

  isMyFavorite(){
    return(this.props.comment.favorite_user_ids.includes(Auth.currentUserId()))
  }

  isShow(attr){
    const opt = this.props.showOptions
    if(!opt){
      return(true)
    }else{
     return(opt[attr] == true)
    }
  }


  handleClickAnchor(e){
    e.preventDefault()
    e.stopPropagation()
    this.props.showCommentModal({
      board_id: this.props.comment.board_id,
      num: e.target.dataset.num
    })
  }

  renderNum(){
    if(this.isShow('num')){
      return(
        <span className="comment-header-num">
          <strong>{ this.props.comment.num }</strong>
        </span>
      )
    }
  }

  renderName(){
    if(this.isShow('name')){
      return(
        <span className="comment-header-name">
          <strong>{ this.isMyComment() ? "あなたです！" : this.props.comment.name }</strong>
        </span>
      )
    }
  }

  renderCreatedAt(){
    if(this.isShow('created_at')){
      return(
        <span className="comment-header-created_at">
          <Time value={ new Date(this.props.comment.created_at) }
            format="YYYY[年]MM[月]DD[日] (dddd) HH:mm:ss"/>
        </span>
      )
    }
  }

  renderHashId(){
    if(this.isShow('hash_id')){
      return(
        <span className="comment-header-hash_id">
          ID: { this.props.comment.hash_id }
        </span>
      )
    }
  }

  renderContent(){
    const html = Autolinker.link(this.props.comment.content, {
      urls: {
        schemeMatches: true,
        wwwMatches: false,
        tldMatches: false,
      },
      email: false,
      phone: false,
      stripPrefix: false,
      stripTrailingSlash: false,
    }).replace(/\r?\n/g, '<br/>')
    const anchor_matcher = new AnchorMatcher('anchor', {}, (match, props) => {
      return(
        <a key={ Math.random() }
           data-num={ props.extraProp }
           onClick={ this.handleClickAnchor.bind(this) }>
          {match}
        </a>
      )
    })
    return (<Interweave tagName="div" content={ html } matchers={ [anchor_matcher] }/>)
  }

  renderWebsites(){
    if(this.isShow('websites')){
      return (
        <ul className="comment-image-list list-inline">
        { this.props.comment.websites.map( (website) => {
            return(
              <li key={ `website-${website.id}` }>
                <Thumbnail target="_BLANK" href={ website.full_url } src={ website.thumbnail_url } />
              </li>
            )
          })
        }
        </ul>
      )
    }
  }

  renderImages(){
    if(this.isShow('images')){
      return (
        <ul className="comment-image-list list-inline">
        { this.props.comment.images.map( (image) => {
            return(
              <li key={ `image-${image.id}` }>
                <Thumbnail target="_BLANK" href={ image.full_url } src={ image.thumbnail_url } />
              </li>
            )
          })
        }
        </ul>
      )
    }
  }

  renderToolBox(){
    if(this.isShow('toolbox')){
      return(
        <ul className="comment-tools list-inline">
          <li className="comment-tools-reply">
            <button onClick={ this.reply.bind(this) }>
              <Glyphicon glyph="share-alt" />
            </button>
          </li>
          <li className={ this.isMyFavorite() ? "comment-tools-favorite  my-favorite" : "comment-tools-favorite" }>
            <button onClick={ this.favorite.bind(this) }>
              <Glyphicon glyph="heart" />
              <span className="button-text">{ this.props.comment.favorite_user_ids.length }</span>
            </button>
          </li>
        </ul>
      )
    }
  }

  render() {
    return(
      <div className="comment" onClick={ this.showCommentDetail.bind(this) }>
        <div className="comment-box">
          <div className="comment-header">
            <div>
              { this.renderNum() }
              { this.renderName() }
              { this.renderCreatedAt() }
              { this.renderHashId() }
            </div>
          </div>
          <div className="comment-body">
            { this.renderContent() }
            { this.renderWebsites() }
            { this.renderImages() }
          </div>
          { this.renderToolBox() }
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  showOptions: PropTypes.object,
  comment: PropTypes.object.isRequired,
  favorite: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  showCommentModal: PropTypes.func.isRequired,
}
