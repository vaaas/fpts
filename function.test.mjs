import * as fn from './dist/function.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'

const add = a => b => a + b
const str = x => x + ''

describe('function', () => {
    describe('pipe', () => {
        it('should pipe the end of one function into the start of the next', () => {
            assert.equal(
                fn.pipe(
                    1,
                    add(1),
                    add(1),
                    add(1),
                    add(1),
                ),
                5
            )
        })

        it('should do nothing without functions', () => {
            assert.equal(
                fn.pipe(1),
                1
            )
        })
    })

    describe('compose', () => {
        it('should compose functions left-to-right', () => {
            assert.equal(
                fn.compose(
                    add(1),
                    add(1),
                    str,
                )(1),
                '3'
            )
        })

        it('should create the id function without arguments', () => {
            assert.equal(
                fn.compose()(1),
                1
            )
        })
    })
})