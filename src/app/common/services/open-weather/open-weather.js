'use strict'

import fetch from 'isomorphic-fetch'

class WeatherService {
    constructor () {
        this.config = {
            endpoint: 'http://api.openweathermap.org/data/2.5'
        }
    }

    boot (config) {
        this.config = Object.assign({}, this.config, config)
    }

    getWeatherForCity (city) {
        var query = {}

        if(!(typeof city === 'string' || typeof city === 'number')) {
            throw new TypeError('City should be either string or number')
        }

        if (typeof city === 'string') {
            query = Object.assign({}, query, { q: city })
        }

        if (typeof city === 'number') {
            query = Object.assign({}, query, { id: city })
        }

        return this.requestApi('weather', query)
    }

    requestApi (area, params) {
        var url = this.getUrl(area, params)
        return fetch(url, {
            method: 'get',
            headers: new Headers({
            })
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error('Bad response from server')
            }

            return response.json()

        })
    }

    getUrl (area, params) {
        var queryString = Object.keys(params).map( (queryKey) => {
            return queryKey + '=' + params[queryKey]
        }).join('&amp;')

        return `${this.config.endpoint}/${area}?${queryString}&appid=${this.config.appId}`
    }
}


export default WeatherService