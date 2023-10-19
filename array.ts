import type { Unary } from './data.ts'
import type { Option } from './option.ts'
import { ofV, values } from './map.ts'

/** return the first element of an array */
export const first = <T>(xs: Array<T>): T|undefined => xs[0]

/** return the last element of an array */
export const last = <T>(xs: Array<T>): T|undefined => xs[xs.length-1]

/** return the middle value of an array
 *
 * if the count of the array's items is even, return the value that is just after the middle
 */
export const middle = <T>(xs: Array<T>): T|undefined => xs[xs.length >> 1]

/** get an element from an array by index */
export const get = (x: number) => <T>(xs: T[]): Option<T> => xs[x]

/** creates a new array from an iterable */
export const of = <T>(xs: Iterable<T>): Array<T> => Array.from(xs)

/** map implementation for arrays */
export const map = <A, B>(f: Unary<A, B>) => (xs: A[]): B[] => xs.map(f)

/** transform every element **A** of an array of **As** into an element **B**
 * using the provided function `f` **A** -> **B**
 *
 * returns an array of **Bs**
 *
 * this transformation happens *in place*, mutating the array
 */
export const map_ip = <A, B>(f: Unary<A, B>) => (xs: A[]): B[] => {
    for (let i = 0; i < xs.length; i++)
        // @ts-expect-error
        xs[i] = f(xs[i])
    // @ts-expect-error
    return xs
}

/** filter implentation for arrays
 *
 * iterates over an array, passing each element to a predicate function
 *
 * @param f the predicate function, receiving an array item and returning a boolean
 * @param xs the array of items
 * @returns a new array containing only the items for which the given function returns `true`
 */
export const filter = <A>(f: Unary<A, boolean>) => (xs: A[]): A[] => xs.filter(f)

/** in-place implementation of filter
 *
 * iterates over an array, passing each element to a predicate function
 *
 * if the function returns false, the item is removed from the array **in place, modifying the original array**
 *
 * - `f` — the predicate function, returning true or false
 * - `xs` — the array to operate on
 */
export const filter_ip = <A>(f: Unary<A, boolean>) => (xs: A[]): A[] => {
    /** index of our current position */
    let i = 0
    /** known good length */
    let j = 0
    const len = xs.length
    while (i < len) {
        const x = xs[i]!
        if (f(x)) {
            xs[j] = x
            j++
        }
        i++
    }
    xs.length = j
    return xs
}

/** bind / flatMap implentation for arrays */
export const bind = <A, B>(f: Unary<A, Array<B>>) => (xs: A[]): B[] => xs.flatMap(f)

/** remove duplicates from any iterable, keeping only unique items
 *
 * @param xs an iterable with possibly duplicate items
 * @returns an array with only unique items
 */
export const unique = <T>(xs: Iterable<T>): Array<T> => of(new Set(xs))

/** return iterable without any duplicates
 *
 * the key by which an iterable is defined as a duplicate is provided by the function `f`
 */
export const uniqueBy = <A, B>(f: Unary<A, B>) => (xs: Iterable<A>): Array<A> => of(values(ofV(f)(xs)))

/** return every element of an array except the first */
export const tail = <T>(xs: T[]): T[] => xs.slice(1)

/** return every element of an array except the last */
export const head = <T>(xs: T[]): T[] => xs.slice(0, -1)

/** return a sliced iterable out of an array
 *
 * more efficient in terms of memory, as it does not allocate a new array
 */
export const islice = (start: number, end: number) => function* <T>(xs: T[]): Iterable<T> {
    const actual_end = Math.min(end, xs.length)
    for (let i = start; i < actual_end; i++)
        yield xs[i]!
}

/** join all elements of an array into a string, separated by a delimitter */
export const joinWith = (s: string) => (xs: Array<string>): string => xs.join(s)

/** duplicate an element and turn it into a duad */
export const dup = <T>(x: T): [T, T] => [x, x]

export function* ireverse<T>(xs: T[]): Iterable<T> {
    for (let i = xs.length - 1; i >= 0; i--)
        yield xs[i]!
}

/** yields all possible combinations between `As` and `Bs` */
export function* pairs<A, B>(as: A[], bs: B[]): Iterable<[A, B]> {
    for (const a of as)
        for (const b of bs)
            yield [a, b]
}

/** returns true if an element is inside an array */
export const inside = <T>(xs: T[]) => <U>(x: U | T): x is T => xs.includes(x as T)

/** returns true if an element is outside an array */
export const outside = <T>(xs: T[]) => <U>(x: U | T): x is U => !xs.includes(x as T)

/** pick a random element from an array */
export const pick = <T extends Array<any> | ReadonlyArray<any>>(xs: T): T[number] =>
    xs[Math.floor(Math.random() * xs.length)]
