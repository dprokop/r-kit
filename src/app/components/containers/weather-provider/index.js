import { Component } from 'react'
import Services from 'services'
import fetch from 'isomorphic-fetch'
import _ from 'underscore'
import { connect } from 'react-redux'
import { fetchWeather, refreshChannels } from 'areas/weather/actions'

const mapStateToProps = (state) => {
  return {
    currentWeather: state.weather.current,
    forecast: state.weather.forecast
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelRefresh: (id) => dispatch(fetchWeather(id)),
    onRefresh: (channelIds) => { dispatch(refreshChannels(channelIds)) }
  }
}

var WeatherProvider = (Composed) => connect(mapStateToProps, mapDispatchToProps)(
  class WeatherProvider extends Component {
    render () {
      return (
              <Composed
                  isLoading = {this.props.currentWeather.isLoading}
                  current={this.props.currentWeather}
                  forecast={this.props.forecast}
                  onChannelRefresh={this.props.onChannelRefresh}
                  onRefresh={ () => this.props.onRefresh(this.props.weather.channels) }
              />
          )
    }
  }
)

export default WeatherProvider
