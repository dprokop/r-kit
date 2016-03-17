import { Component } from 'react'
import { Provider } from 'react-redux'
import Normalize from 'normalize.css'
import WeatherProvider from 'components/containers/weather-provider'
import GeolocationProvider from 'components/containers/geolocation-provider'
import WeatherCardsList from 'components/presentational/weather-cards-list'
import DevTools from 'components/containers/dev-tools'

var AppComponent = ({store}) => {
  var WeatherComponent = WeatherProvider(WeatherCardsList)

  return (
    <Provider store={store}>
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--8-col-tablet mdl-cell--4-col'>
            <GeolocationProvider />
            <WeatherComponent />
            <DevTools />
        </div>
      </div>
    </Provider>
  )
}

export default AppComponent
