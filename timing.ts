import { NoValue } from 'fpts/data'

export function next_tick(f: () => any) {
	return setTimeout(f, 0)
}

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
