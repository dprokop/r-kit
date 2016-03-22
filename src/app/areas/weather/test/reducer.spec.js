/* global describe, beforeEach, it, expect */

import deepFreeze from 'deep-freeze'
import { channelsReducer, currentWeatherReducer, forecastReducer } from '../reducer'

describe('Weather channels reducer', function () {
  it('adds channel to channels list when data received', function () {
    var stateBefore = [1, 2, 3]
    var stateAfter = [1, 2, 3, 4]
    var action = {
      type: 'RECEIVED_WEATHER_DATA',
      payload: {
        id: 4
      }
    }
    deepFreeze(stateBefore)

    var result = channelsReducer(stateBefore, action)
    expect(result).toEqual(stateAfter)
  })

  it('does not duplicate channels in channels\' list when data received', function () {
    var stateBefore = [1, 2, 3]
    var stateAfter = [1, 2, 3, 4]
    var action = {
      type: 'RECEIVED_WEATHER_DATA',
      payload: {
        id: 4
      }
    }
    deepFreeze(stateBefore)

    var result1 = channelsReducer(stateBefore, action)
    deepFreeze(result1)
    var result2 = channelsReducer(result1, action)

    expect(result2).toEqual(stateAfter)
  })
})

describe('Current weather reducer', function () {
  var stateBefore
  beforeEach(function () {
    stateBefore = {
      1: {
        isLoading: false
      },
      2: {
        isLoading: true
      },
      9: {
        isLoading: true
      }
    }
  })

  it('sets current weather\'s loading state to true when data requested', function () {
    var stateAfter = {
      1: {
        isLoading: false
      },
      2: {
        isLoading: true
      },
      9: {
        isLoading: true
      },
      isLoading: true
    }

    var action = {
      type: 'REQUEST_WEATHER',
      payload: {
        id: 10
      }
    }

    deepFreeze(stateBefore)

    var result = currentWeatherReducer(stateBefore, action)

    expect(result).toEqual(stateAfter)
  })

  it('sets loading state to false for given id when data received', function () {
    deepFreeze(stateBefore)

    var action = {
      type: 'RECEIVED_WEATHER_DATA',
      payload: {
        id: 2,
        weather: [ {id: 800} ]
      }
    }

    var result = currentWeatherReducer(stateBefore, action)
    expect(result['2'].isLoading).toBeFalsy()
  })

  it('sets data state to payload for given id when data received', function () {
    var stateAfter = {
      id: 2,
      weather: [ {id: 800} ]
    }

    deepFreeze(stateBefore)

    var action = {
      type: 'RECEIVED_WEATHER_DATA',
      payload: {
        id: 2,
        weather: [ {id: 800} ]
      }
    }

    var result = currentWeatherReducer(stateBefore, action)
    expect(result['2'].data).toEqual(stateAfter)
  })

  it('sets loading state to false, error to true when failed receiving data', function () {
    deepFreeze(stateBefore)

    var action = {
      type: 'FAILED_RECEIVING_WEATHER_DATA',
      payload: {
        id: 2
      }
    }
    var result = currentWeatherReducer(stateBefore, action)
    expect(result['2'].isLoading).toBeFalsy()
    expect(result['2'].error).toBeTruthy()
  })
})
