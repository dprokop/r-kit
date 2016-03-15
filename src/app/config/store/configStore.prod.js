import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from 'app/config/reducers'

const storeEnhancers = compose(applyMiddleware(thunkMiddleware))

function setupStore (initialState) {
  return createStore(reducers, initialState, storeEnhancers)
}

export default setupStore
