import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from "redux-localstorage-filter"

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import thunk from 'redux-thunk';

import rootReducer from './reducers'

// components
import Home from './components/home'
import Menu from './components/menu'
import Inquiry from './components/inquiry'
import About from './components/about'
import Footer from './components/footer'

// connected components
import BoardList from './containers/board/list'
import ShowBoard from './containers/board/show'
import SignUp from './containers/user/sign_up'
import Login from './containers/user/login'
import Logout from './containers/user/logout'

// styles
import '../css/home.css'
import '../css/menu.css'
import '../css/message.css'
import '../css/board.css'
import '../css/comment.css'
import '../css/footer.css'

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

const reducer = compose(
  mergePersistedState()
)(rootReducer);

const storage = compose(
  filter(['auth'])
)(adapter(window.localStorage))

const enhancer = compose(
  compose(applyMiddleware(thunk), persistState(storage, 'auth')),
  DevTools.instrument()
);

const store = createStore(
  reducer,
  enhancer
)


render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <div>
          <Menu />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/login" component={Login}/>
            <Route path="/sign_up" component={SignUp}/>
            <Route path="/categories/:id/boards" component={BoardList}/>
            <Route path="/boards/:id" component={ShowBoard}/>
            <Route path="/boards" component={BoardList}/>
            <Route path="/inquiry" component={Inquiry}/>
            <Route path="/about" component={About}/>
          </Switch>
          <Footer />
          <DevTools />
        </div>
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('app')
)
