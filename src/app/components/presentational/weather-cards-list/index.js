import WeatherProvider from 'components/containers/weather-provider'
import WeatherCard from 'components/presentational/weather-card'
import WeatherBackground from 'components/presentational/weather-bg'
import { PropTypes } from 'react'
import _ from 'underscore'

import Services from 'common/services'

var WeatherCardsList = ({ isLoading, children, channelsData, onChannelRefresh, onRefresh }) => {
  var loader = isLoading ? <span>Loading ...</span> : null

  var cards = _.map(_.keys(channelsData), (key) => {
    var card

    var cardProps = {}
    var data = channelsData[key].data

    if (data) {
      console.log(data.id)
      cardProps = {
        id: data.id,
        title: data.name,
        temperature: data.main.temp,
        key: data.id,
        error: data.error
      }
    }
    if (isLoading) {
      loader = <span>Loading...</span>
    }
    if (channelsData[key].isLoading) {
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
  channelsData: PropTypes.object,
  onRefresh: PropTypes.func,
  onChannelRefresh: PropTypes.func
}

export default WeatherCardsList
