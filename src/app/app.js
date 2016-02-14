'use strict'

import { createStore } from 'redux'
import reducers from 'app/reducers'

/** Class representing app */
class App {

    /**
     * Initialize application
     * @param  {Object} initialState - initial state passed to the app
     */
    constructor (initialState) {
        this.store = createStore(reducers, initialState)
    }
}

export default App
