import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { createBrowserHistory } from "history"
import { routerMiddleware  } from 'react-router-redux'
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from "redux-localstorage-filter"
import rootReducer from '../reducers'

const reducer = compose(
  mergePersistedState()
)(rootReducer);

const storage = compose(
  filter(['auth'])
)(adapter(window.localStorage))

const browserHistory = createBrowserHistory()
const router = routerMiddleware(browserHistory)

const enhancer = compose(
  compose(applyMiddleware(thunk,router), persistState(storage, 'auth'))
)

export const store = createStore(
  reducer,
  enhancer
)
