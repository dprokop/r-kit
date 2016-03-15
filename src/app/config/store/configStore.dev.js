import { createStore, applyMiddleware, compose } from 'redux'
import DevTools from 'components/containers/dev-tools'
import thunkMiddleware from 'redux-thunk'
import reducers from 'app/config/reducers'

const storeEnhancers = compose(applyMiddleware(thunkMiddleware), DevTools.instrument())

function setupStore (initialState) {
  return createStore(reducers, initialState, storeEnhancers)
}

export default setupStore
