export function randint(a: number, b: number) {
	return a + Math.floor(Math.random() * (b-a))
}

export function neg(x: number): number { return -1 * x }

export function add(a: number): (b: number) => number {
	return function(b) {
		return a + b
	}
}

export function mult(a: number): (b: number) => number {
	return function(b) {
		return a * b
	}
}
