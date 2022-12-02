import { NoValue } from './data'

export function next_tick(f: () => any) {
	return setTimeout(f, 0)
}

/** throttle a function, so that multiple calls execute at most once per **t** milliseconds */
export function throttle<T>(f: (x: T) => any, t: number): (x: T) => any {
    let nextValue: T | typeof NoValue = NoValue;
    let id: ReturnType<typeof setTimeout> | undefined;
    return (function throttle(x: T): void {
        if (id)
            nextValue = x;
        else {
            nextValue = NoValue;
            id = setTimeout(() => {
                if (nextValue !== NoValue)
                    f(nextValue as T)
                id = undefined
            }, t)
            f(x)
        }
    })
}

/** debounce a function, so that multiple calls execute only once after **t** milliseconds of delay */
export function debounce<T>(f: (x: T) => any, t: number): (x: T) => void {
    let id: ReturnType<typeof setTimeout> | undefined;
    return (function debounce(x: T): void {
        if (id) {
            clearTimeout(id)
            id = undefined
        }
        id = setTimeout(() => {
            f(x)
            id = undefined
        }, t)
    })
}

/** debounce a function, so that multiple calls execute only once when time is available */
export function microtask<T extends Array<any>>(f: (...xs: T) => void) {
    let running: boolean = false;
    let args: T | never[] = [];
    return function microtask(...xs: T): void {
        if (running) {
            args = xs
            return
        }
        running = true
        args = xs
        queueMicrotask(() => {
            f(...args as T)
            args = []
            running = false
        })
    }
}

export function on_next_frame<T extends Array<any>>(f: (...xs: T) => void) {
    let running: boolean = false;
    let args: T | never[] = [];
    return function on_next_frame(...xs: T): void {
        if (running) {
            args = xs
            return
        }
        running = true
        args = xs
        requestAnimationFrame(() => {
            f(...args as T)
            args = []
            running = false
        })
    }
}
