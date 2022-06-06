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

	map<U>(f: (x: T) => U): LazyArray<U> {
		const self = this
		return new LazyArray((function* () {
			for (const x of self)
				yield f(x)
		})())
	}

	filter(f: (x: T) => boolean): LazyArray<T> {
		const self = this
		return new LazyArray((function* () {
			for (const x of self)
				if (f(x))
					yield x
		})())
	}

	reduce<U>(f: (a: U, b: T) => U, i: U): U {
		let a = i
		for (const x of this)
			a = f(a, x)
		return a
	}
}
