/*global describe, beforeEach, it, expect*/

'use strict'

import deepFreeze from 'deep-freeze'

import { todos } from '../reducer'

describe('Todo reducer', function () {
    var stateBefore = []
    var stateAfter = ['Added todo']

    beforeEach(function () {

    })

    it('should add todo', function (){
        deepFreeze(stateBefore)
        var action = {
            type: 'ADD_TODO',
            text: 'Added todo'
        }
        var result = todos(stateBefore, action)
        console.log(result)
        expect(result).toEqual(stateAfter)
    })

    it('should add todo', function (){
        deepFreeze(stateBefore)
        var action = {
            type: 'REMOVE_TODO',
            id: 0
        }
        var result = todos(stateBefore, action)

        // expect(result).toEqual(stateAfter)
    })


})