export function pipe<A, B>(
	x: A,
	a: (x: A) => B,
): B
export function pipe<A, B, C>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
): C
export function pipe<A, B, C, D>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
): D
export function pipe<A, B, C, D, E>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
): E
export function pipe<A, B, C, D, E, F>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
): F
export function pipe<A, B, C, D, E, F, G>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
): G
export function pipe<A, B, C, D, E, F, G, H>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
	h: (x: H) => I,
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
	h: (x: H) => I,
	i: (x: I) => J,
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
	x: A,
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
	h: (x: H) => I,
	i: (x: I) => J,
	j: (x: J) => K,
): K
export function pipe(x: any, ...fs: Array<any>): any {
	let a = x
	for (const f of fs) a = f(a)
	return a
}

export function compose<A, B, C>(
	a: (x: A) => B,
	b: (x: B) => C,
): (x: A) => C
export function compose<A, B, C, D>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
): (x: A) => D
export function compose<A, B, C, D, E>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
): (x: A) => E
export function compose<A, B, C, D, E, F>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
): (x: A) => F
export function compose<A, B, C, D, E, F, G>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
): (x: A) => G
export function compose<A, B, C, D, E, F, G, H>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
): (x: A) => H
export function compose<A, B, C, D, E, F, G, H, I>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
	h: (x: H) => I,
): (x: A) => I
export function compose<A, B, C, D, E, F, G, H, I, J>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
	h: (x: H) => I,
	i: (x: I) => J,
): (x: A) => J
export function compose<A, B, C, D, E, F, G, H, I, J, K>(
	a: (x: A) => B,
	b: (x: B) => C,
	c: (x: C) => D,
	d: (x: D) => E,
	e: (x: E) => F,
	f: (x: F) => G,
	g: (x: G) => H,
	h: (x: H) => I,
	i: (x: I) => J,
	j: (x: J) => K,
): (x: A) => K
export function compose(...fs: any): (x: any) => any {
	return function(x) {
		let a = x
		for (const f of fs) a = f(a)
		return a
	}
}
