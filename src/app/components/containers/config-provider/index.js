import { Component } from 'react'
import { connect } from 'react-redux'
import { setUnit, refreshChannels } from 'areas/weather/actions'
import ConfigBar from 'components/presentational/config-bar'

const mapStateToProps = (state) => {
  return {
    config: state.weather.config,
    channels: state.weather.channels
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUnitChange: (unit) => {
      dispatch(setUnit(unit))
    },
    onRefresh: () => {
      dispatch(refreshChannels())
    }
  }
}
var ConfigProvider = connect(mapStateToProps, mapDispatchToProps)(ConfigBar)

export default ConfigProvider
