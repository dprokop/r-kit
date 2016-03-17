import AppSettings from 'app/config/app_settings'
import setupStore from 'app/config/store'
import { bootServices } from 'services'
import { fetchWeather } from 'areas/weather/actions'

/** Class representing app */
class App {

  /**
   * Initialize application
   * @param  {Object} initialState - initial state passed to the app
   */
  constructor (initialState) {
    this.store = setupStore({})

    this.configureServices(AppSettings)
  }

  /**
   * Initialize services with provided configuration
   */
  configureServices () {
    console.log('Booting up services')
    bootServices(AppSettings.services)
  }
}

export default App
