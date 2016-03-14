import { combineReducers } from 'redux'
import { weather as weatherReducer } from 'areas/weather/reducer'

export default combineReducers({
  weather: weatherReducer
})
