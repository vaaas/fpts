import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as cont from './dist/cont.js'
import { I } from './dist/combinator.js'

describe('cont', () => {
	const inc_cont = x => f => f(x + 1)

	const str_cont = x => f => f(x + '')

	const str = x => x + ''

	describe('map', () => {
		it('should transform continuations', () => {
			assert.equal(
				cont.map(str)(inc_cont(1))(I),
				'2'
			)
		})
	})

	describe('bind', () => {
		it('should chain continuations', () => {
			assert.equal(
				cont.bind(str_cont)(inc_cont(1))(I),
				'2'
			)
		})
	})
})
