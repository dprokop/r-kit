'use strict'

import { combineReducers } from 'redux'

import { todos as todosReducer } from 'areas/todos/reducer'
import { weather as weatherReducer } from 'areas/weather/reducer'

export default combineReducers({
    todos: todosReducer,
    weather: weatherReducer
})