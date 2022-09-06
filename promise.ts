import { Unary } from './data'

export function next_frame(): Promise<void> {
    return new Promise((yes) => {
        requestAnimationFrame(() => yes())
    })
}

export function next_tick(): Promise<void> {
    return new Promise((yes) => yes())
}

export function sleep(n: number): Promise<void> {
    return new Promise(yes => setTimeout(() => yes(), n))
}

export function map<A, B>(f: Unary<A, B>): (x: Promise<A>) => Promise<B> {
    return function(x) {
        return x.then(f)
    }
}

export function bind<A, B>(f: Unary<A, Promise<B>>): (x: Promise<A>) => Promise<B> {
    return function(x) {
        return x.then(f)
    }
}

export function then<A, B>(f: Unary<A, B>): (x: Promise<A>) => Promise<B>
export function then<A, B>(f: Unary<A, Promise<B>>): (x: Promise<A>) => Promise<B> {
    return function(x) {
        return x.then(f);
    }
}
