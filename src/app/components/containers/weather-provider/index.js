'use strict'

import { Component } from 'react'


var WeatherProvider = Composed => class extends Component {
    constructor () {
        super()
        this.state = {
            channels: [
                {
                    id: 3085041,
                    title: 'Kraków',
                    summary: 'Rainy'
                }
            ]
        }

        this.refreshChannel = this.refreshChannel.bind(this)
        this.refreshChannels = this.refreshChannels.bind(this)
    }

    componentDidMount () {
        /**
         * @todo fetch data
         */
    }

    render () {
        return (
            <Composed
                channels = {this.state.channels}
                onRefresh = {this.refreshChannels}
                onChannelRefresh = {this.refreshChannel} />
        )
    }

    refreshChannels () {
        console.log('Refreshing channels...')
    }

    refreshChannel (id) {
        console.log('Refreshing channel:', id)
    }
}

export default WeatherProvider