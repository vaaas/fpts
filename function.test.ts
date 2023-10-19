import * as fn from './function.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'
import { Binary, Unary } from './data.js'

const add: Binary<number, number, number> = a => b => a + b
const str: Unary<any, string> = x => x + ''

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
                // @ts-ignore
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
                // @ts-ignore
                fn.compose()(1),
                1
            )
        })
    })

    describe('once', () => {
        it('should only allow a function to be called once', () => {
            const test = fn.spy(() => true)
            const once_test = fn.once(test)
            once_test()
            const result = once_test()
            assert.equal(result, undefined)
            assert.equal(test.calls.length, 1)
        })
    })
})
