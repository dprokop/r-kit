import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import config from 'app/config'
import reducers from 'app/reducers'
import { bootServices } from 'services'

import { fetchWeather } from 'areas/weather/actions'

/** Class representing app */
class App {

  /**
   * Initialize application
   * @param  {Object} initialState - initial state passed to the app
   */
  constructor (initialState) {
    this.store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware))

    this.configureServices(config)

    setTimeout(() => {
      this.store.dispatch(fetchWeather(666))
      this.store.dispatch(fetchWeather(3085041))
    }, 1000)

    setTimeout(() => {
      this.store.dispatch(fetchWeather(2172797))
    }, 1500)
  }

  /**
   * Initialize services with provided configuration
   */
  configureServices () {
    console.log('Booting up services')
    bootServices(config.services)
  }
}

export default App
