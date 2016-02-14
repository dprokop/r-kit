'use strict'

import { combineReducers } from 'redux'

import { todos as todosReducer } from 'areas/todos/reducer'

export default combineReducers({
    todos: todosReducer
})