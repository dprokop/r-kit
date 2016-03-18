import { PropTypes } from 'react'
import styles from './weather-card.scss'

var WeatherCard = ({id, icon, isLoading, title, temperature, error, onRefresh}) => {
  var buttons = []

  buttons.push(
    <button
      onClick = { onRefresh }
      className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
      <i className='material-icons'>refresh</i>
    </button>)

  var loader = isLoading ? <i className='material-icons'>event</i> : null

  var card = (
    <div className='weather-card mdl-card mdl-shadow--2dp'>
      <div className='mdl-card__title'>
        <img src={icon}/>
        <h2 className='mdl-card__title-text'>
          {title} / {temperature}
        </h2>
      </div>
      <div className='mdl-card__actions mdl-card--border'>
        {buttons}
        <div className='mdl-layout-spacer'></div>
        {loader}
      </div>
    </div>
  )

  return card
}

WeatherCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  summary: PropTypes.string,
  onRefresh: PropTypes.func
}

WeatherCard.defaultProps = {
  title: 'Card title',
  summary: 'Card summary'
}

export default WeatherCard
