/* global describe, beforeEach, it, expect */

import OpenWeatherService from '../open-weather'

describe('Open weather service', function () {
  var service = new OpenWeatherService()
  var config = {
    endpoint: 'http://api.openweathermap.org/data/2.5',
    appId: 123123
  }

  beforeEach(function () {
    service.boot(config)
  })

  it('should boot with provided config', function () {
    var result = {
      endpoint: 'http://api.openweathermap.org/data/2.5',
      appId: 123123,
      unit: 'metric'
    }
    expect(service.config).toEqual(result)
  })

  it('should build a valid url', function () {
    var result = service.getUrl('weather', {
      q: 'Cracow,PL',
      id: '123123'
    })
    expect(result).toEqual('http://api.openweathermap.org/data/2.5/weather?q=Cracow,PL&amp;id=123123&appid=123123&units=metric')
  })

  it('should return icon file name for given weather code', function () {
    var result = service.getIcon(800)
    expect(result).toEqual('Sun.svg')
  })

  it('should return default icon file name for unknown weather code', function () {
    var result = service.getIcon(666)
    expect(result).toEqual('default.svg')
  })

  it('should build location query from name', function () {
    var result = service.getLocationQuery('Cracow')

    expect(result).toEqual({
      q: 'Cracow'
    })
  })

  it('should build location query from id number', function () {
    var result = service.getLocationQuery(123)

    expect(result).toEqual({
      id: 123
    })
  })

  it('should build location query from long/lat object', function () {
    var result = service.getLocationQuery({lat: 1, lon: 2, data: 'data'})

    expect(result).toEqual({
      lat: 1,
      lon: 2
    })
  })
})
