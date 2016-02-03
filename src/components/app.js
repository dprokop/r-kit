'use strict'

import { Component } from 'react'
import Normalize from 'normalize.css';

export default class AppComponent extends Component {
    constructor () {
        super()
        this.state = {
            active: false,
            counter: 0
        }

        this.onClick = this.onClick.bind(this)
    }
    render () {
        var style = {}
        if(this.state.active) {
            style = { color: 'yellow' }
        }
        return (
            <div>
                <h1 style={style} onClick={this.onClick}>{this.state.counter} - Hello world!</h1>
            </div>
        )
    }

    onClick () {
        this.setState({
            active: !this.state.active,
            counter: this.state.counter+5
        })
    }
}