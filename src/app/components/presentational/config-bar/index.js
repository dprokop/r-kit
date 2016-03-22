import { Component } from 'react'

var ConfigBar = ({ config, onUnitChange }) => {
  return (
    <div>
      <a onClick={ (e) => { onUnitChange('imperial') }}>Imperial</a>
      <a onClick={ (e) => { onUnitChange('metric') }}>Metric</a>
    </div>
  )
}

export default ConfigBar
