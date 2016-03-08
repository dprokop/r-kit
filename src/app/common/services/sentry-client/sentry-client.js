/*global Raven*/
'use strict'

class WeatherService {
    constructor () {
        this.config = {}
    }

    boot (config) {
        this.config = Object.assign({}, this.config, config)
        Raven.config(this.config.clientUrl).install()
    }

}


export default WeatherService