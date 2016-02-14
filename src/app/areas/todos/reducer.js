/** @module todos/reducer */

'use strict'

import * as todoActions from './actions'

/**
 * Todos reducer
 * @param  {Array}  state  - current state to be reduced
 * @param  {Object} action - action to be performed on current state
 * @param  {string} action.type - {@link ADD_TODO|ADD_TODO}, {@link REMOVE_TODO|REMOVE_TODO}
 * @return {Array} - array representing new state
 */
export function todos (state = [], action) {
    switch (action.type) {
    case todoActions.ADD_TODO:
        return [...state, action.text]
        break
    case todoActions.REMOVE_TODO:
        return []
        break
    default:
        return state
    }
}