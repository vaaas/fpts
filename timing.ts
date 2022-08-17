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
export function debounce<T>(f: (x: T) => any, t: number): (x: T) => any {
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
