import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { createBrowserHistory } from "history"
import { routerMiddleware  } from 'react-router-redux'
import { createDevTools } from 'redux-devtools'
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from "redux-localstorage-filter"

// for dev
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import rootReducer from '../reducers'

const reducer = compose(
  mergePersistedState()
)(rootReducer);

const storage = compose(
  filter(['auth'])
)(adapter(window.localStorage))

export const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

const browserHistory = createBrowserHistory()
const router = routerMiddleware(browserHistory)

const enhancer = compose(
  compose(applyMiddleware(thunk, router), persistState(storage, 'auth')),
  DevTools.instrument()
)

export const store = createStore(
  reducer,
  enhancer
)
