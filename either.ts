import { Nothing } from 'fpts/maybe'

export class Either<A, B> {
	left: A | typeof Nothing;
	right: B | typeof Nothing;

	static left<A, B>(left: A): Either<A, B> {
		return new Either(left, Nothing) as any as Either<A, B>
	}

	static right<A, B>(right: B): Either<A, B> {
		return new Either(Nothing, right) as any as Either<A, B>
	}

	constructor(left: A | typeof Nothing, right: B | typeof Nothing) {
		this.left = left
		this.right = right
	}

	map<C>(f: (x: B) => C): Either<A, C> {
		if (this.left === Nothing)
			return Either.right(f(this.right as B)) as Either<A, C>
		else
			return this as any as Either<A, C>
	}

	bind<C, D>(f: (x: B) => Either<C, D>): Either<C, D> {
		if (this.left === Nothing)
			return f(this.right as B)
		else
			return this as any as Either<C, D>
	}

	fold<C>(f: (x: A) => C, g: (x: B) => C): C {
		if (this.left === Nothing)
			return g(this.right as B)
		else
			return f(this.left as A)
	}
}
