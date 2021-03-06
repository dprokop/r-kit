import fetch from 'isomorphic-fetch'

class WeatherService {
  constructor () {
    this.config = {
      endpoint: 'http://api.openweathermap.org/data/2.5',
      unit: 'metric'
    }

    this.setupIconsMapping()
  }

  boot (config) {
    console.log('boot weather')
    return new Promise((resolve, reject) => {
      this.config = Object.assign({}, this.config, config)
      resolve(this)
    })
  }

  getWeatherForLocation (location) {
    var query = this.getLocationQuery(location)

    return this.requestApi('weather', query)
  }

  getForecastForLocation (location) {
    var query = this.getLocationQuery(location)

    return this.requestApi('forecast', query)
  }

  requestApi (area, params) {
    var url = this.getUrl(area, params)
    return fetch(url, {
      method: 'get',
      headers: new Headers({
      })
    }).then(function (response) {
      if (response.status >= 400) {
        throw new OpenWeatherError(response)
      } else {
        return response.json()
      }
    })
  }

  getUrl (area, params) {
    var queryString = Object.keys(params).map((queryKey) => {
      return queryKey + '=' + params[queryKey]
    }).join('&amp;').concat(`&appid=${this.config.appId}&units=${this.config.unit}`)

    var url = `${this.config.endpoint}/${area}?${queryString}`
    return url
  }

  getIcon (code) {
    return this.icons.get(code) ? this.icons.get(code) : 'default.svg'
  }

  getLocationQuery (location) {
    var query = {}
    var argType = (
      typeof location === 'string' || typeof location === 'number' || typeof location === 'object'
    )

    if (!argType) {
      throw new TypeError('City should be either string, number or object')
    }

    if (typeof location === 'string') {
      query = Object.assign({}, query, { q: location })
    }

    if (typeof location === 'number') {
      query = Object.assign({}, query, { id: location })
    }

    if (typeof location === 'object') {
      query = Object.assign({}, query, { lat: location.lat, lon: location.lon })
    }

    return query
  }

  setupIconsMapping () {
    this.icons = new Map()
    this.icons.set(800, 'Sun.svg')
  }

  setUnit (unit) {
    this.config.unit = unit
  }
}

export class OpenWeatherError extends Error {
  constructor (response) {
    super()
    this.code = response.status
    this.message = `OpenWeather API returned error code: ${this.code}`
  }
}

export default WeatherService
