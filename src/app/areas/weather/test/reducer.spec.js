/*global describe, beforeEach, it, expect*/

'use strict'

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
                    isLoading: false,
                },
                2: {
                    isLoading: true,
                },
                9: {
                    isLoading: true,
                }
            },
            lastRefreshed: timestamp
        }
    })

    it('should set isLoading to truthy when requesting weather for given id', function (){
        var stateAfter = {
            channels: [1,2,5,9],
            currentWeather: {
                1: {
                    isLoading: true,
                },
                2: {
                    isLoading: true,
                },
                9: {
                    isLoading: true,
                }
            },
            lastRefreshed: timestamp
        }

        deepFreeze(stateBefore)

        var action = {
            type: 'REQUEST_WEATHER',
            payload: {
                channel: 1
            }
        }

        var result = weather(stateBefore, action)

        expect(result).toEqual(stateAfter)
    })

    it('should add new channel to channels list if it doesn\'t exist', function () {
        var stateAfter = {
            channels: [1,2,5,9,3],
            currentWeather: {
                1: {
                    isLoading: false,
                },
                2: {
                    isLoading: true,
                },
                9: {
                    isLoading: true,
                }
            },
            lastRefreshed: timestamp
        }

        deepFreeze(stateBefore)

        var action = {
            type: 'FETCH_WEATHER',
            payload: {
                channel: 3
            }
        }

        var result = weather(stateBefore, action)

        expect(result).toEqual(stateAfter)
    })

    it('should set new channel\'s isLoading state to truthy when data requested', function (){
        var stateAfter = {
            1: {
                isLoading: false,
            },
            2: {
                isLoading: true,
            },
            9: {
                isLoading: true,
            },
            3: {
                isLoading: true,
            }
        }

        deepFreeze(stateBefore)

        var action = {
            type: 'REQUEST_WEATHER',
            payload: {
                channel: 3
            }
        }

        var result = weather(stateBefore, action)

        expect(result.currentWeather).toEqual(stateAfter)
    })

    it('should set isLoading to falsy and payload to received data for the requested id', function (){
        var stateAfter = {
            channels: [1,2,5,9],
            currentWeather: {
                1: {
                    isLoading: false,
                },
                2: {
                    isLoading: false,
                    data: {
                        id: 2
                    }
                },
                9: {
                    isLoading: true,
                }
            },
            lastRefreshed: timestamp
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

    it('should remove id from channels and data from currentWeather if wrong id provided', function (){
        var stateAfter = {
            channels: [1, 2, 5],
            currentWeather: {
                1: {
                    isLoading: false,
                },
                2: {
                    isLoading: true,
                }
            },
            lastRefreshed: timestamp
        }

        deepFreeze(stateBefore)

        var action = {
            type: 'RECEIVED_WEATHER_DATA',
            payload: {
                cod: 404,
                message: 'Error message',
                id: 9
            }
        }

        var result = weather(stateBefore, action)

        expect(result).toEqual(stateAfter)
    })

})
