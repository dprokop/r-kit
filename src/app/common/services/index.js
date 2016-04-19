import OpenWeatherService from 'services/open-weather'
import SentryClient from 'services/sentry-client'
import Geolocation from 'services/geolocation'

let Services = {
  OpenWeather: new OpenWeatherService(),
  Sentry: new SentryClient(),
  Geolocation: new Geolocation()
}

export default Services

export function bootServices (config) {
  // Object.keys(config).forEach((key) => {
  //   if (Services[key]) {
  //     if (config[key].enabled) {
  //       console.log(`\tBooting up ${key} service`)
  //       try {
  //         Services[key].boot(config[key])
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }
  //   } else {
  //     throw new Error(`${key} service is not defined`)
  //   }
  // })
  var promises = []
  Object.keys(config).forEach((key) => {
    if (config[key].enabled) {
      if (Services[key] && Services[key].boot !== 'undefined ') {
        console.log(`\tBooting up ${key} service`)
        try {
          promises.push(Services[key].boot(config[key]))
        } catch (e) {
          console.log(e)
        }
      } else {
        throw new Error(`${key} service is not defined`)
      }
    }
  })

  return Promise.all(promises)
}
