import { Component } from 'react'

var ConfigBar = ({ config, onUnitChange, onRefresh }) => {
  return (
    <div>
      <a onClick={ () => { onUnitChange('imperial') }}>Imperial</a>
      <a onClick={ () => { onUnitChange('metric') }}>Metric</a>
      <a onClick={ () => { onRefresh() }}>
        <i className='material-icons'>refresh</i>
      </a>
    </div>
  )
}

export default ConfigBar
