/** @module weather/reducer */

import AppSettings from 'app/config/app_settings'
import Services from 'services'
import * as weatherActions from './actions'
import _ from 'underscore'

/**
 * @todo Update state type and default value to reflect your model
 * @todo Implement reducer
 *
 * Weather reducer
 * @param  {Object}  state  - current state to be reduced
 * @param  {Object} action - action to be performed on current state
 * @param  {string} action.type - {@link REQUEST_WEATHER|REQUEST_WEATHER}, {@link FETCH_WEATHER|FETCH_WEATHER}, {@link RECEIVED_WEATHER_DATA|RECEIVED_WEATHER_DATA}, {@link FAILED_RECEIVING_WEATHER_DATA|FAILED_RECEIVING_WEATHER_DATA}
 * @return {Object} - object representing new state
 */

var defaultState = {
  channels: [],
  current: {},
  forecast: {},
  config: {}
}

export default function weather (state = defaultState, action) {
  return {
    channels: channelsReducer(state.channels, action),
    current: currentWeatherReducer(state.weather, action),
    forecast: forecastReducer(state.forecast, action),
    config: weatherConfigReducer(state.config, action)
  }
}

export function channelsReducer (state = defaultState.channels, action) {
  var payload = action.payload
  switch (action.type) {
    case weatherActions.RECEIVED_WEATHER_DATA: {
      var nextState = state.slice(0)
      // nextState.push(payload.id)
      return _.union(nextState, [payload.id])
    }
    default: {
      return state
    }
  }
}

export function currentWeatherReducer (state = defaultState.current, action) {
  var payload = action.payload
  switch (action.type) {
    case weatherActions.REQUEST_WEATHER: {
      return Object.assign({}, state, { isLoading: true })
    }
    case weatherActions.RECEIVED_WEATHER_DATA: {
      let nextState = {}
      if (payload.cod && parseInt(payload.cod) === 404) {
        nextState = Object.assign({})
      } else {
        var nextWeather = Object.assign({}, state)
        nextWeather[payload.id] = Object.assign({}, {
          isLoading: false,
          data: payload,
          icon: `${AppSettings.paths.images}/${Services.OpenWeather.getIcon(payload.weather[0].id)}`
        })
      }
      return Object.assign({}, nextWeather, {isLoading: false})
    }
    case weatherActions.FAILED_RECEIVING_WEATHER_DATA: {
      var nextState = Object.assign({}, state.currentWeather)
      nextState[payload.id] = Object.assign({}, nextState[payload.id], {
        isLoading: false,
        error: true
      })

      return Object.assign({}, state, nextState)
    }
    default:
      return state
  }
}

export function forecastReducer (state = defaultState.forecast, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export function weatherConfigReducer (state = defaultState.config, action) {
  var payload = action.payload
  switch (action.type) {
    case weatherActions.UPDATE_UNIT:
      return Object.assign({}, state, { unit: payload.unit })
    default: {
      return state
    }
  }
}
