import { combineReducers } from 'redux'
import weatherReducer from 'areas/weather/reducer'

export default combineReducers({
  weather: weatherReducer
})
