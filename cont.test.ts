import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { Cont, map, bind } from './cont.ts'
import { I } from './combinator.ts'

describe('cont', () => {
	const inc_cont = (x: number): Cont<number> => f => f(x + 1)

	const str_cont = (x: any): Cont<string> => f => f(x + '')

	const str = (x: any) => x + ''

	describe('map', () => {
		it('should transform continuations', () => {
			assert.equal(
				map(str)(inc_cont(1))(I),
				'2'
			)
		})
	})

	describe('bind', () => {
		it('should chain continuations', () => {
			assert.equal(
				bind(str_cont)(inc_cont(1))(I),
				'2'
			)
		})
	})
})
