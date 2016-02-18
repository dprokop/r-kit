'use strict'

import { PropTypes } from 'react'


var WeatherCard = ({title, summary, onRefresh}) => {
    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">{title}</h2>
            </div>
            <div className="mdl-card__supporting-text">
                {summary}
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <a onClick={ () => onRefresh() } className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  Refresh
                </a>
            </div>
            <div className="mdl-card__menu">
                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                    <i className="material-icons"></i>
                </button>
            </div>
        </div>
    )
}

WeatherCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    onRefresh: PropTypes.func
}

export default WeatherCard