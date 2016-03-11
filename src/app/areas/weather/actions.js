'use strict'

import fetch from 'isomorphic-fetch'
import Services from 'services'

/*=======================================
=              Action types             =
=======================================*/
/**
 * REQUEST_WEATHER action type
 * @constant
 * @type {string}
 */
export const REQUEST_WEATHER = 'REQUEST_WEATHER'

/**
 * FETCH_WEATHER action type
 * @constant
 * @type {string}
 */
export const FETCH_WEATHER = 'FETCH_WEATHER'

/**
 * RECEIVED_WEATHER_DATA action type
 * @constant
 * @type {string}
 */
export const RECEIVED_WEATHER_DATA = 'RECEIVED_WEATHER_DATA'

/**
 * FAILED_RECEIVING_WEATHER_DATA action type
 * @constant
 * @type {string}
 */
export const FAILED_RECEIVING_WEATHER_DATA = 'FAILED_RECEIVING_WEATHER_DATA'

/*=====  End of Action types  ======*/


/*=======================================
=            Action creators            =
=======================================*/

/** @module weather/actions */

/**
 * REQUEST_WEATHER action creator
 * @param {(string|number)} Name or id of the city
 * @return {@link REQUEST_WEATHER} action object
 */
export function requestWeather (channel) {
    return {
        type: REQUEST_WEATHER,
        payload: {
            channel: channel
        }
    }
}

/**
 * FETCH_WEATHER action creator
 * @param {(string|number)} Name or id of the city
 * @return Thunk function responsible for fetching weather data
 * @desc This action creator is further processed by reduc-thunk middleware
 */
export function fetchWeather (channel) {
    return dispatch => {
        dispatch(requestWeather(channel))
        return Services.OpenWeather
                .getWeatherForCity(channel)
                .then( data => {
                    dispatch(receivedWeatherData(Object.assign({}, data, {
                        id: channel
                    })))
                }).catch( error => {
                    dispatch(failedReceivingWeatherData(channel, error))
                })
    }
}

/**
 * RECEIVED_WEATHER_DATA action creator
 * @param {Object} Object reresenting weather information for given place
 * @return {@link RECEIVED_WEATHER_DATA} action object
 */
export function receivedWeatherData (weatherData) {
    return {
        type: RECEIVED_WEATHER_DATA,
        payload: weatherData
    }
}

/**
 * FAILED_RECEIVING_WEATHER_DATA action creator
 * @param {string|number} channel Name or id of the weather channel
 * @return {@link FAILED_RECEIVING_WEATHER_DATA} action object
 */
export function failedReceivingWeatherData (channel, error) {
    return {
        type: FAILED_RECEIVING_WEATHER_DATA,
        payload: {
            channel: channel,
            error: error
        }
    }
}

/*=====  End of Action creators  ======*/
