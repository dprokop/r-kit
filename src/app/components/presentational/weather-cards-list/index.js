'use strict'

import WeatherProvider from 'components/containers/weather-provider'
import WeatherCard from 'components/presentational/weather-card'
import { PropTypes } from 'react'
import _ from 'underscore'

import Services from 'common/services'

var WeatherCardsList = ({ channelsData, onChannelRefresh, onRefresh }) => {
    var cards = _.map(_.keys(channelsData), key => {
        var card, data
        if(channelsData[key].isLoading){
            card = <WeatherCard isLoading key={key} />
        }else {
            data = channelsData[key].data
            card = <WeatherCard
                id={data.id}
                title={data.name}
                key={data.id}
                onRefresh={ () => onChannelRefresh(data.id) }
            />
        }

        return card
    })

    return (
        <div>
            <button
                onClick={ onRefresh }
                className="mdl-button mdl-button--fab mdl-button--colored">
                <i className="material-icons">Refresh</i>
            </button>
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
