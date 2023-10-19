import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as program from './program.js'
import { I } from './combinator.js'
import { Cont } from './cont.js'
import { Unary } from './data.js'

describe('program', () => {
	const Interpreters = {
		Maths: {
			inc: (x: number): Cont<number> => k => k(x + 1)
		},

		String: {
			str: (x: any): Cont<string> => k => k(x + '')
		}
	}

    type IInterpreters = typeof Interpreters

	const inc = (x: number) => (i: IInterpreters) => i.Maths.inc(x)

	const str = (x: any) => (i: IInterpreters) => i.String.str(x)

	const str_raw: Unary<any, string> = x => x + ''

	const run = program.run(Interpreters, I)

	describe('map', () => {
		it('should transform programs', () => {
			const p = program.map(str_raw)(inc(1))
			assert.equal(run(p), '2')
		})
	})

	describe('bind', () => {
		it('should chain programs', () => {
			const p = program.bind(str)(inc(1))
			assert.equal(run(p), '2')
		})
	})
})
