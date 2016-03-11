/** @module weather/reducer */

'use strict'

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
    case weatherActions.REQUEST_WEATHER:
        var nextWeather = Object.assign({}, state.currentWeather)

        if(!state.currentWeather[payload.channel]){
            nextWeather[payload.channel] = { isLoading: true }
        }else {
            nextWeather[payload.channel] = Object.assign({}, nextWeather[payload.channel], { isLoading: true })
        }

        return Object.assign({ }, {
            channels: state.channels,
            currentWeather: nextWeather,
            lastRefreshed: state.lastRefreshed
        })

    case weatherActions.FETCH_WEATHER:
        return Object.assign({}, {
            channels: _.union(state.channels, [payload.channel]),
            currentWeather: state.currentWeather,
            lastRefreshed: state.lastRefreshed
        })

    case weatherActions.RECEIVED_WEATHER_DATA:
        if (payload.cod && parseInt(payload.cod) === 404) {
            var nextState = Object.assign({}, {
                channels: state.channels.filter( channel => { return channel!==payload.id } )
            })

            return Object.assign({}, {
                channels: _.without( state.channels, payload.id),
                currentWeather: _.omit(state.currentWeather, payload.id.toString()),
                lastRefreshed: state.lastRefreshed
            })
        }else{

            var nextWeather = Object.assign({}, state.currentWeather)
            var timestamp = Date.now()
            nextWeather[payload.id] = Object.assign({},{
                isLoading: false,
                data: payload
            })

            return Object.assign({}, state, {
                currentWeather: nextWeather,
                lastRefreshed: timestamp
            })
        }

    case weatherActions.FAILED_RECEIVING_WEATHER_DATA:
        var nextState = Object.assign({}, _.omit(state.currentWeather, payload.channel.toString()))

        return Object.assign({}, state, {
            currentWeather: nextState
        })
    default:
        return state
    }
}
