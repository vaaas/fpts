/** return a random integer in the range [a, b) */
export function randint(a: number, b: number) {
	return a + Math.floor(Math.random() * (b-a))
}

/** flip the sign of a number */
export function neg(x: number): number { return -1 * x }

/** add two numbers */
export function add(a: number): (b: number) => number {
	return function(b) {
		return a + b
	}
}

/** multiply two numbers */
export function mult(a: number): (b: number) => number {
	return function(b) {
		return a * b
	}
}

/** the natural numbers. infinite iterable */
export function* Naturals() {
	for (let i = 0; true; i++) yield i
}

/** the integers. infinite iterable */
export function* Integers() {
	yield 0
	for (let i = 0; true; i = neg(i) + (i > 0 ? 0 : 1))
		yield i
}

/** the grandi series */
export function* Grandi() {
	for (let i = 1; true; i = neg(i))
		yield i
}
