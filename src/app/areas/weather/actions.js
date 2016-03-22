import fetch from 'isomorphic-fetch'
import Services from 'services'
import _ from 'underscore'

/*=======================================
=              Action types             =
=======================================*/
/**
 * SET_UNIT action type
 * @constant
 * @type {string}
 */
export const SET_UNIT = 'SET_UNIT'

/**
 * UPDATE_UNIT action type
 * @constant
 * @type {string}
 */
export const UPDATE_UNIT = 'UPDATE_UNIT'

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

/* =====  End of Action types  ======*/

/*=======================================
=            Action creators            =
=======================================*/

/** @module weather/actions */

/**
 * SET_UNIT action creator
 * @param {(string)} Name or id of the city
 * @return {@link SET_UNIT} action object
 */
export function setUnit (unit, channels) {
  return (dispatch, getState) => {
    Services.OpenWeather.setUnit(unit)
    dispatch(updateUnit(unit))
    var { weather: { channels: channels } } = getState()
    dispatch(refreshChannels(channels))
  }
}

/**
 * UPDATE_UNIT action creator
 * @param {(string)} Name or id of the city
 * @return {@link UPDATE_UNIT} action object
 */
export function updateUnit (unit, channels) {
  return {
    type: UPDATE_UNIT,
    payload: {
      unit: unit
    }
  }
}

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
  return (dispatch) => {
    dispatch(requestWeather(channel))
    Services.OpenWeather
      .getWeatherForLocation(channel)
      .then((data) => {
        dispatch(receivedWeatherData(data))
      }).catch((error) => {
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

/**
 * REFRESH_CHANNELS action creator
 * @return {@link REFRESH_CHANNELS} action object
 */
export function refreshChannels () {
  return (dispatch, getState) => {
    var { weather: { channels: channels } } = getState()
    _.each(channels, (id) => {
      dispatch(fetchWeather(id))
    })
  }
}

/* =====  End of Action creators  ======*/
