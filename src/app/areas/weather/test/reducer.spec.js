/* global describe, beforeEach, it, expect */

import deepFreeze from 'deep-freeze'
import { weather } from '../reducer'

describe('Weather reducer', function () {
  var stateBefore
  var timestamp = Date.now()

  beforeEach(function () {
    stateBefore = {
      channels: [1, 2, 5, 9],
      currentWeather: {
        1: {
          isLoading: false
        },
        2: {
          isLoading: true
        },
        9: {
          isLoading: true
        }
      },
      lastRefreshed: timestamp
    }
  })

  it('sets weather\'s loading state to true when data requested', function () {
    var stateAfter = {
      channels: [1, 2, 5, 9],
      currentWeather: {
        1: {
          isLoading: false
        },
        2: {
          isLoading: true
        },
        9: {
          isLoading: true
        }
      },
      lastRefreshed: timestamp,
      isLoading: true
    }

    var action = {
      type: 'REQUEST_WEATHER',
      payload: {
        id: 10
      }
    }

    deepFreeze(stateBefore)

    var result = weather(stateBefore, action)

    expect(result).toEqual(stateAfter)
  })

  it('sets loading state to false for given , payload to received data ', function () {
    var stateAfter = {
      channels: [1, 2, 5, 9],
      currentWeather: {
        1: {
          isLoading: false
        },
        2: {
          isLoading: false,
          data: {
            id: 2
          }
        },
        9: {
          isLoading: true
        }
      },
      lastRefreshed: timestamp,
      isLoading: false
    }

    deepFreeze(stateBefore)

    var action = {
      type: 'RECEIVED_WEATHER_DATA',
      payload: {
        id: 2
      }
    }

    var result = weather(stateBefore, action)
    result.lastRefreshed = timestamp
    expect(result).toEqual(stateAfter)
  })

  it('sets loading state to false when failed receiving data', function () {
    var stateAfter = {
      channels: [1, 2, 5, 9],
      currentWeather: {
        1: {
          isLoading: false
        },
        2: {
          isLoading: false,
          error: true
        },
        9: {
          isLoading: true
        }
      },
      lastRefreshed: timestamp,
      isLoading: false
    }

    deepFreeze(stateBefore)

    var action = {
      type: 'FAILED_RECEIVING_WEATHER_DATA',
      payload: {
        id: 2
      }
    }
    var result = weather(stateBefore, action)
    expect(result).toEqual(stateAfter)
  })
})
