import {Component} from 'react'
import {connect} from 'react-redux'
import Services from 'services'
import { fetchWeather } from 'areas/weather/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationChange: (location) => {
      dispatch(fetchWeather(location))
    }
  }
}

class GeolocationProvider extends Component {
  constructor () {
    super()
    Services.Geolocation.watchPosition((location) => {
      this.props.onLocationChange({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
    })
  }

  render () {
    return null
  }

}

export default connect(null, mapDispatchToProps)(GeolocationProvider)
