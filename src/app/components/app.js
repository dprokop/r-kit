'use strict'

import { Component } from 'react'
import { Provider } from 'react-redux'
import Normalize from 'normalize.css'
import WeatherProvider from 'components/containers/weather-provider'
import WeatherCardsList from 'components/presentational/weather-cards-list'

var AppComponent = ({store}) => {
    var WeatherComponent = WeatherProvider(WeatherCardsList)
    return (
        <Provider store={store}>
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--4-col">
                    <WeatherComponent />
                </div>
            </div>
        </Provider>
    )
}

export default AppComponent