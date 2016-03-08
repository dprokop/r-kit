'use strict'

import { createStore } from 'redux'

import config from 'app/config'
import reducers from 'app/reducers'
import { bootServices } from 'services'

/** Class representing app */
class App {

    /**
     * Initialize application
     * @param  {Object} initialState - initial state passed to the app
     */
    constructor (initialState) {
        this.store = createStore(reducers, initialState)

        this.configureServices(config)
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
