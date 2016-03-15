import { PropTypes } from 'react'

var WeatherCard = ({id, isLoading, title, temperature, error, onRefresh}) => {
  var card
  if (isLoading) {
    card = (
            <div className='demo-card-wide mdl-card mdl-shadow--2dp'>
              <div className='mdl-spinner mdl-js-spinner is-active'></div>
            </div>
        )
  } else {
    card = (
            <div className='mdl-card mdl-shadow--2dp'>
                <div className='mdl-card__title'>
                    <h2 className='mdl-card__title-text'>
                        {title} / {temperature}
                    </h2>
                </div>
                <div className='mdl-card__actions'>
                    <button
                        onClick = { onRefresh }
                        className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
                        <i className='material-icons'>refresh</i>
                    </button>
                </div>
            </div>
        )
  }

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
