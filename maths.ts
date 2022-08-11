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
