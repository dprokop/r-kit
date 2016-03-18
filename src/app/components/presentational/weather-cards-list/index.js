import WeatherProvider from 'components/containers/weather-provider'
import WeatherCard from 'components/presentational/weather-card'
import WeatherBackground from 'components/presentational/weather-bg'
import { PropTypes } from 'react'
import _ from 'underscore'

import Services from 'common/services'

var WeatherCardsList = ({ isLoading, children, current, forecast, onChannelRefresh }) => {
  var loader = isLoading ? <span>Loading ...</span> : null

  var cards = _.map(_.keys(current), (key) => {
    var card

    var cardProps = {}
    var data = current[key].data

    if (data) {
      cardProps = {
        id: data.id,
        icon: current[key].icon,
        title: data.name,
        temperature: data.main.temp,
        key: data.id,
        error: data.error
      }
    }
    if (isLoading) {
      loader = <span>Loading...</span>
    }
    if (current[key].isLoading) {
      cardProps['isLoading'] = true
    }
    if (data) {
      card = <WeatherCard
                  {...cardProps}
                  onRefresh={ () => onChannelRefresh(data.id)}
              />
    } else {
      card = null
    }

    return card
  })

  return (
        <div>
          {loader}
          {cards}
        </div>
    )
}

WeatherCardsList.propTyp = {
  current: PropTypes.object,
  onRefresh: PropTypes.func,
  onChannelRefresh: PropTypes.func
}

export default WeatherCardsList
