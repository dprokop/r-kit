'use strict'

/*====================================
=            Action types            =
====================================*/
/**
 * Add todo action type
 * @constant
 * @type {string}
 */
export const ADD_TODO = 'ADD_TODO'

/**
 * Remove todo action type
 * @constant
 * @type {string}
 */
export const REMOVE_TODO = 'REMOVE_TODO'

/*=====  End of Action types  ======*/


/*=======================================
=            Action creators            =
=======================================*/

/** @module todos/actions */

/**
 * Add todo action creator
 * @param {string} text New todo's content
 * @return {@link ADD_TODO|ADD_TODO} action object
 */
export function addTodo (text) {
    return {
        type: ADD_TODO,
        text
    }
}

/**
 * Remove todo action creator
 * @param  {number} id Id of todo to be removed
 * @return {@link REMOVE_TODO|REMOVE_TODO} action object
 */
export function removeTodo (id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

/*=====  End of Action creators  ======*/

