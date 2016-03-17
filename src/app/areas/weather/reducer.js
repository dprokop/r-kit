/** @module weather/reducer */

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
  currentWeather: {},
  lastRefreshed: null
}

export function weather (state = defaultState, action) {
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
        var nextWeather = Object.assign({}, state.currentWeather)
        nextWeather[payload.id] = Object.assign({}, {
          isLoading: false,
          data: payload
        })
        nextState = {
          channels: _.union(state.channels, [payload.id]),
          currentWeather: nextWeather,
          lastRefreshed: Date.now()
        }
      }
      return Object.assign({}, nextState, {isLoading: false})
    }
    case weatherActions.FAILED_RECEIVING_WEATHER_DATA: {
      var nextState = Object.assign({}, state.currentWeather)
      nextState[payload.id] = Object.assign({}, nextState[payload.id], {
        isLoading: false,
        error: true
      })

      return Object.assign({}, state, { currentWeather: nextState, isLoading: false })
    }
    default:
      return state
  }
}
