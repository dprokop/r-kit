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
    expect(service.config).toEqual(config)
  })

  it('should build a valid url', function () {
    var result = service.getUrl('weather', {
      q: 'Cracow,PL',
      id: '123123'
    })
    expect(result).toEqual('http://api.openweathermap.org/data/2.5/weather?q=Cracow,PL&amp;id=123123&appid=123123')
  })
})
