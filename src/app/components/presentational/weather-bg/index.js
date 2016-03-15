import { PropTypes } from 'react'

var WeatherBackground = ({url}) => {
  var styles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'url(\'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=774e99d16e3f3f0e4138be9d98e4f0f9\')',
    backgroundSize: 'cover'
  }
  return (
    <div style={styles}></div>
  )
}

WeatherBackground.propTypes = {
  url: PropTypes.string
}

WeatherBackground.defaultProps = {
  url: ''
}

export default WeatherBackground
