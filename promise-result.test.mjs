import * as promise_result from './dist/promise-result.js'
import { describe, it } from 'node:test'
import { spy } from './dist/function.js'
import * as assert from 'node:assert'

describe('promise-result', () => {
    describe('compose', () => {
        const add = a => b => a + b
        const mult = a => b => a * b
        const add_later = a => b => Promise.resolve(a + b)
        const mult_later = a => b => Promise.resolve(a * b)
        const just_an_error = () => new Error('I am an Error')
        const just_an_error_later = () => Promise.resolve(just_an_error())

        it('should return promises', () => {
            const result = promise_result.compose()(1)
            assert.equal(
                result instanceof Promise,
                true
            )
        })

        it('should compose regular functions', async () => {
            const result = await promise_result.compose(
                add(1),
                mult(2),
            )(1)
            assert.equal(result, 4)
        })

        it('should compose promises', async () => {
            const start = 1

            const result1 = await promise_result.compose(
                add(1),
                mult(2),
            )(start)

            const result2 = await promise_result.compose(
                add_later(1),
                mult(2),
            )(start)
            const result3 = await promise_result.compose(
                add(1),
                mult_later(2),
            )(start)
            const result4 = await promise_result.compose(
                add_later(1),
                mult_later(2),
            )(start)
            assert.equal(result1, 4)
            assert.equal(result1, result2)
            assert.equal(result1, result3)
            assert.equal(result1, result4)
        })

        it('should immediately stop execution on finding errors', async () => {
            const spied_inc = spy(add_later(1))
            const spied_double = spy(mult_later(2))
            const result = await promise_result.compose(
                spied_inc,
                just_an_error,
                spied_double,
            )(1)

            assert.equal(
                result instanceof Error,
                true
            )
            assert.equal(
                spied_inc.calls.length,
                1
            )
            assert.equal(
                spied_double.calls.length,
                0
            )
        })

        it('should immediately stop execution on finding promise errors', async () => {
            const spied_inc = spy(add_later(1))
            const spied_double = spy(mult_later(2))
            const result = await promise_result.compose(
                spied_inc,
                just_an_error_later,
                spied_double,
            )(1)

            assert.equal(
                result instanceof Error,
                true
            )
            assert.equal(
                spied_inc.calls.length,
                1
            )
            assert.equal(
                spied_double.calls.length,
                0
            )
        })
    })
})
