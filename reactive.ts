import { Unary, Binary } from './data'

class Reactive<T> {
    observers: Set<Reactive<any>>
    f: Unary<any, any>

    constructor(f: Unary<any, any>) {
        this.observers = new Set()
    }

    broadcast(x: T): void {
        for (const o of this.observers)
        o.notify(x)
    }

    notify(x: any): void {
        this.f(x)
    }

    watch(o: Reactive<any>): void {
        this.observers.add(o)
    }

    unwatch(o: Reactive<any>): void {
        this.observers.delete(o)
    }
}

class Variable<T> extends Reactive<T> {
    x: T

    constructor(x: T) {
        super(x => this.set(x))
        this.x = x
    }

    set(x: T): void {
        this.x = x
        this.broadcast(x)
    }

    get(): T {
        return this.x
    }
}

export function map<A, B>(f: Unary<A, B>): (o: Reactive<A>) => Reactive<B> {
    return function (o) {
        const o2 = new Reactive<B>((x: A) => o2.broadcast(f(x)))
        o.watch(o2)
        return o2
    }
}

export function filter<A>(f: Unary<A, boolean>): (o: Reactive<A>) => Reactive<A> {
    return function (o) {
        const o2 = new Reactive<A>(x => {
            if (f(x))
                o2.broadcast(x)
        })
        o.watch(o2)
        return o2
    }
}

export function scanl<A, B>(f: Binary<A, B, A>, i: A): (o: Reactive<B>) => Reactive<A> {
    return function (o) {
        let a = i
        const o2 = new Reactive<A>((x: B) => {
            a = f(a)(x)
            o2.broadcast(a)
        })
        o.watch(o2)
        return o2
    }
}

export function scanr<A, B>(f: Binary<B, A, A>, i: A): (o: Reactive<B>) => Reactive<A> {
    return function (o) {
        let a = i
        const o2 = new Reactive<A>((x: B) => {
            a = f(x)(a)
            o2.broadcast(a)
        })
        o.watch(o2)
        return o2
    }
}

export function each<T>(f: Unary<T, any>): (o: Reactive<T>) => Reactive<T> {
    return function(o) {
        const o2 = new Reactive(f)
        o.watch(o2)
        return o
    }
}
