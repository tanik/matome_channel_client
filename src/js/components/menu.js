import React from 'react';
import { Navbar, FormGroup, FormControl, InputGroup, Button, Glyphicon, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer  } from 'react-router-bootstrap'
import Auth from '../utils/auth';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const currnet_path = this.props.location.pathname || ""
    const matched = currnet_path.match(/\/boards\/search\/(.+)/)
    if(matched){
      const query = matched[1] || ""
      this.setState({query: query})
    }else{
      this.setState({query: ""})
    }
  }

  sendCommand(e) {
    const ENTER = 13
    if (e.keyCode == ENTER) {
      this.search()
    }
  }

  search(){
    if(this.input.value.length > 0){
      this.props.history.push('/boards/search/' + encodeURIComponent(this.input.value))
    }else{
      this.props.history.push('/boards')
    }
  }

  renderAuthMenu(){
    if(Auth.isAuthorized()){
      return(
        <ul className="nav navbar-nav navbar-right">
          <NavDropdown eventKey={1} title={ Auth.info().uid } id="basic-nav-dropdown">
            <LinkContainer to="/my/boards">
              <MenuItem eventKey={1.1}>作成スレッド一覧</MenuItem>
            </LinkContainer>
            <LinkContainer to="/my/comments">
              <MenuItem eventKey={1.2}>書き込みコメント一覧</MenuItem>
            </LinkContainer>
            <LinkContainer to="/my/favorite_boards">
              <MenuItem eventKey={1.3}>お気に入りスレッド一覧</MenuItem>
            </LinkContainer>
            <LinkContainer to="/my/favorite_comments">
              <MenuItem eventKey={1.4}>お気に入りコメント一覧</MenuItem>
            </LinkContainer>
            <LinkContainer to="/my/histories">
              <MenuItem eventKey={1.5}>スレッド閲覧履歴</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/logout">
              <MenuItem eventKey={1.10}>ログアウト</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </ul>
      )    
    }else{
      return(
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item"><Link to="/login">ログイン</Link></li>
        </ul>
      )
    }
  }

  handleQueryChange(e){
    this.setState({query: e.target.value})
  }

  render () {
    return (
      <div>
        <Navbar inverse className="menu-top">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <div className='list-inline'>まとめ<img src='https://img.m-ch.xyz/statics/icon.png' width='24px'/>ちゃんねる</div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/boards">
                <NavItem>スレッド</NavItem>
              </LinkContainer>
            </Nav>
            <Navbar.Form pullLeft>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    inputRef={ref => { this.input = ref }}
                    placeholder="Search"
                    onKeyDown={this.sendCommand.bind(this) }
                    value={ this.state.query }
                    onChange={ this.handleQueryChange.bind(this) }
                  />
                  <InputGroup.Button>
                    <Button onClick={ this.search.bind(this) }>
                      <Glyphicon glyph="search"/>
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Navbar.Form>
            { this.renderAuthMenu() }
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
