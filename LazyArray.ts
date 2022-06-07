export class LazyArray<T> {
	iter: Iterator<T> | undefined;
	items: Array<T>;

	static of<T>(iter: Iterable<T>): LazyArray<T> {
		return new LazyArray(iter);
	}

	constructor(iter: Iterable<T>) {
		this.iter = iter[Symbol.iterator]()
		this.items = []
	}

	[Symbol.iterator](): Iterator<T> {
		console.log(this.items)
		if (!this.iter)
			return this.items[Symbol.iterator]()
		let len: number = this.items.length
		let i: number = 0

		return {
			next: () => {
				if (i < len)
					return {
						value: this.items[i++],
						done: false,
					}
				else {
					const next = this.iter!.next()
					if (next.done)
						this.iter = undefined
					else
						this.items.push(next.value)
					return next
				}
			}
		}
	}
}

export function map<A, B>(f: (x: A) => B): (xs: LazyArray<A>) => LazyArray<B> {
	return function (xs) {
		return LazyArray.of((function* () {
			for (const x of xs)
				yield f(x)
		})())
	}
}

export function filter<A>(f: (x: A) => boolean): (xs: LazyArray<A>) => LazyArray<A> {
	return function (xs) {
		return LazyArray.of((function* () {
			for (const x of xs)
				if (f(x))
					yield x
		})())
	}
}

export function foldl<A, B>(f: (a: A) => (b: B) => A, i: A): (xs: LazyArray<B>) => A {
    return function (xs) {
        let a = i
        for (const x of xs) a = f(a)(x)
        return a
    }
}

export function foldr<A, B>(f: (a: A) => (b: B) => B, i: B): (xs: LazyArray<A>) => B {
    return function (xs) {
        let a = i
        for (const x of xs) a = f(x)(a)
        return a
    }
}
