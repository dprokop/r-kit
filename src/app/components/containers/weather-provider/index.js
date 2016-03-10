'use strict'

import { Component } from 'react'
import Services from 'services'
import fetch from 'isomorphic-fetch'
import _ from 'underscore'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        weather: state.weather
    }
}

var WeatherProvider = Composed => connect(mapStateToProps)(class WeatherProvider extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <Composed
                channelsData={this.props.weather.currentWeather}
                onRefresh={this.props.onRefresh}
                onChannelRefresh={this.props.onChannelRefresh}
            />
        )
    }

})

export default WeatherProvider

