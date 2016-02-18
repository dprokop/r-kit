'use strict'

import WeatherProvider from 'components/containers/weather-provider'
import WeatherCard from 'components/presentational/weather-card'
import _ from 'underscore'
import { PropTypes } from 'react'

var WeatherCardsList = ({ channels, onChannelRefresh, onRefresh }) => {
    var cards = _.map(channels, function (channel, i) {
        return (
            <WeatherCard
                id={channel.id}
                title = {channel.title}
                summary = {channel.summary}
                onRefresh = { () => onChannelRefresh(channel.id) }
                key={channel.id}
            />
        )
    })

    return (
        <div>
            <button onClick={ () => onRefresh() } className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                <i className="material-icons">Refresh</i>
            </button>
            {cards}
        </div>
    )
}

WeatherCardsList.propTyp = {
    channels: PropTypes.array,
    onRefresh: PropTypes.func,
    onChannelRefresh: PropTypes.func
}

export default WeatherCardsList