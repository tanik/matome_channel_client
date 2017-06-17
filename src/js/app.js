import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// components
import Home from './components/home'
import About from './components/about'
import Footer from './components/footer'

// connected components
import Menu from './containers/menu'
import Message from './containers/message'
import Contact from './containers/contact'
import BoardList from './containers/board/list'
import ShowBoard from './containers/board/show'
import SignUp from './containers/user/sign_up'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import MyBoards from './containers/user/board'
import MyComments from './containers/user/comment'

// styles
import '../css/home.css'
import '../css/about.css'
import '../css/menu.css'
import '../css/message.css'
import '../css/category.css'
import '../css/board.css'
import '../css/comment.css'
import '../css/footer.css'
import '../css/mypage.css'

// store
let store
let DevTools
if(APP_CONFIG.APP_ENV == "production"){
  store = require("./stores/store_prod").store
}else{
  store = require("./stores/store_dev").store
  DevTools = require("./stores/store_dev").DevTools
}

render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <div>
          <Message />
          <Menu />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/login" component={Login}/>
            <Route path="/sign_up" component={SignUp}/>
            <Route path="/my/boards" render={ () => <MyBoards type={ 'boards' }/> } />
            <Route path="/my/favorite_boards" render={ () => <MyBoards type={ 'favorite_boards' }/> } />
            <Route path="/my/comments" render={ () => <MyComments type={ 'comments' }/> } />
            <Route path="/my/favorite_comments" render={ () => <MyComments type={ 'favorite_comments' }/> } />
            <Route path="/my/histories" render={ () => <MyBoards type={ 'histories' }/> } />
            <Route path="/categories/:id/boards" component={BoardList}/>
            <Route path="/categories/:id" component={Home}/>
            <Route path="/boards/search/:query" component={BoardList}/>
            <Route path="/boards/:id/images" component={ShowBoard}/>
            <Route path="/boards/:id/websites" component={ShowBoard}/>
            <Route path="/boards/:id" component={ShowBoard}/>
            <Route path="/boards" component={BoardList}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Redirect path="*" to='/'/>
          </Switch>
          <Footer />
          { (() => { if( APP_CONFIG.APP_ENV != "production" ){ return(<DevTools />) } })() }
        </div>
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('app')
)
