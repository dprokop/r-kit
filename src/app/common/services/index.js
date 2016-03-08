'use strict'

import OpenWeatherService from 'services/open-weather'
import SentryClient from 'services/sentry-client'

let Services = {
    OpenWeather: new OpenWeatherService(),
    Sentry: new SentryClient()
}

export default Services

export function bootServices (config) {
    Object.keys(config).forEach( key => {
        if(Services[key]){
            console.log(`\tBooting up ${key} service`)
            Services[key].boot(config[key])
        } else {
            throw new Error(`${key} service is not defined`)
        }

    })
}