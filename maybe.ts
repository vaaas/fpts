export const Nothing = Symbol('Nothing')

export class Maybe<A> {
	x: A | typeof Nothing;

	static of<A>(x: A) {
		return new Maybe(x);
	}

	static nothing<A>(): Maybe<A> {
		return new Maybe(Nothing) as any as Maybe<A>
	}

	constructor(x: A | typeof Nothing) {
		this.x = x
	}

	map<B>(f: (x: A) => B): Maybe<B> {
		if (this.x === Nothing)
			return this as any as Maybe<B>
		else
			return Maybe.of(f(this.x))
	}

	bind<B>(f: (x: A) => Maybe<B>): Maybe<B> {
		if (this.x === Nothing)
			return this as any as Maybe<B>
		else
			return f(this.x)
	}

	get(def: A): A {
		if (this.x === Nothing)
			return def
		else
			return this.x
	}
}

export function maybe<A, B>(def: B, f: (x: A) => B): (x: A | null | undefined) => B {
	return function (x) {
		if (x === undefined || x === null)
			return def
		else
			return f(x)
	}
}
