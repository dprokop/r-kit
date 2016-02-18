'use strict'

import { Component } from 'react'
import Normalize from 'normalize.css'
import WeatherProvider from 'components/containers/weather-provider'
import WeatherCardsList from 'components/presentational/weather-cards-list'

var AppComponent = () => {
    var WeatherComponent = WeatherProvider(WeatherCardsList)
    return (
        <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
                <WeatherComponent />
            </div>
        </div>
    )
}

export default AppComponent