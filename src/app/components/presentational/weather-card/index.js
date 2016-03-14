import { PropTypes } from 'react'

var WeatherCard = ({isLoading, title, summary, onRefresh}) => {
  var card
  if (isLoading) {
    card = (
            <div className='demo-card-wide mdl-card mdl-shadow--2dp'>
                <div className='mdl-card__title'>
                    <h2 className='mdl-card__title-text'>Loading</h2>
                </div>
            </div>
        )
  } else {
    card = (
            <div className='demo-card-wide mdl-card mdl-shadow--2dp'>
                <div className='mdl-card__title'>
                    <h2 className='mdl-card__title-text'>{title}</h2>
                </div>
                <div className='mdl-card__supporting-text'>
                    {summary}
                </div>
                <div className='mdl-card__actions mdl-card--border'>
                    <a
                        onClick={ onRefresh }
                        className='mdl-button mdl-button--colored'>
                      Refresh
                    </a>
                </div>
                <div className='mdl-card__menu'>
                    <button
                        className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
                        <i className='material-icons'></i>
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
