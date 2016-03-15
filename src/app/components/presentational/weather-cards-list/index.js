import WeatherProvider from 'components/containers/weather-provider'
import WeatherCard from 'components/presentational/weather-card'
import WeatherBackground from 'components/presentational/weather-bg'
import { PropTypes } from 'react'
import _ from 'underscore'

import Services from 'common/services'

var WeatherCardsList = ({ children, channelsData, onChannelRefresh, onRefresh }) => {
  var cards = _.map(_.keys(channelsData), (key) => {
    var card, data
    if (channelsData[key].isLoading) {
      card = <WeatherCard isLoading key={key} />
    } else {
      data = channelsData[key].data
      card = <WeatherCard
                id={data.id}
                title={data.name}
                temperature={data.main.temp}
                key={data.id}
                error={channelsData[key].error}
                onRefresh={ () => onChannelRefresh(data.id) }
            />
    }

    return card
  })

  return (
        <div>
          <WeatherBackground />
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
