"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.batch = exports.flatten = exports.all = exports.any = exports.optimumBy = exports.optimum = exports.findIndex = exports.multifind = exports.find = exports.partition = exports.each = exports.zip = exports.zipWith = exports.enumerate = exports.repeat = exports.limit = exports.or = exports.and = exports.some = exports.every = exports.joinWith = exports.join = exports.last = exports.first = exports.by = exports.sumBy = exports.sum = exports.alphabetically = exports.sort = exports.scanr = exports.scanl = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.filter = exports.bind = exports.map = exports.is = exports.next = exports.iter = exports.StopIteration = void 0;
const combinator_1 = require("./combinator");
const maths_1 = require("./maths");
const string_1 = require("./string");
const duad_1 = require("./duad");
exports.StopIteration = Symbol();
/** get the iterator of any iterable
 * like python's iter
 */
function iter(x) {
    return x[Symbol.iterator]();
}
exports.iter = iter;
function next(x) {
    const n = x.next();
    return n.done
        ? exports.StopIteration
        : n.value;
}
exports.next = next;
/** test if **X** is iterable */
function is(x) {
    if (x === null || x === undefined)
        return false;
    else
        return typeof x[Symbol.iterator] === 'function';
}
exports.is = is;
/** map implementation for iterables
 *
 * given a mapping function **A** → **B**
 * turn a collection of **As** into a collection of **Bs**
 */
function map(f) {
    return function* (xs) {
        for (const x of xs)
            yield f(x);
    };
}
exports.map = map;
/** bind implementation for iterables
 *
 * given a mapping function **A** → **Bs**
 * turn a collection af **As** into a collection of **Bs**
 *
 * in other words, it maps and then flattens the iterable
 */
function bind(f) {
    return function* (xs) {
        for (const x of xs)
            yield* f(x);
    };
}
exports.bind = bind;
/** filter implementation for iterables
 *
 * given a testing function **A** → *boolean* and a collection of **As**
 * generate a new collection of **As** that only contains the elements
 * for which the testing function returns *true*
 */
function filter(f) {
    return function* (xs) {
        for (const x of xs)
            if (f(x))
                yield x;
    };
}
exports.filter = filter;
/** left fold for iterables
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
function foldl(f, i) {
    return function (xs) {
        let a = i;
        for (const x of xs)
            a = f(a)(x);
        return a;
    };
}
exports.foldl = foldl;
/** right fold for iterables
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
function foldr(f, i) {
    return function (xs) {
        let a = i;
        for (const x of xs)
            a = f(x)(a);
        return a;
    };
}
exports.foldr = foldr;
/** left fold for iterables without initial value
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
function foldl1(f, i) {
    return function (xs) {
        const it = iter(xs);
        let a = i;
        let v = it.next();
        if (v.done)
            return a;
        else
            a = v.value;
        v = it.next();
        while (!v.done) {
            a = f(a)(v.value);
            v = it.next();
        }
        return a;
    };
}
exports.foldl1 = foldl1;
/** right fold for iterables without initial value
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
function foldr1(f, i) {
    return function (xs) {
        const it = iter(xs);
        let a = i;
        let v = it.next();
        if (v.done)
            return a;
        else
            a = v.value;
        v = it.next();
        while (!v.done) {
            a = f(v.value)(a);
            v = it.next();
        }
        return a;
    };
}
exports.foldr1 = foldr1;
/** left scan for iterables with intermediate results
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * yields each step **A** as an iterable of accumulated values.
 * the last element is identical to *foldl*.
 *
 * the initial value is given by **i**
 */
function scanl(f, i) {
    return function* (xs) {
        let a = i;
        yield a;
        for (const x of xs)
            yield a = f(a)(x);
    };
}
exports.scanl = scanl;
/** right scan for iterables with intermediate results
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * yields each step **A** as an iterable of accumulated values.
 * the last element is identical to *foldr*.
 *
 * the initial value is given by **i**
 */
function scanr(f, i) {
    return function* (xs) {
        let a = i;
        yield a;
        for (const x of xs)
            yield a = f(x)(a);
    };
}
exports.scanr = scanr;
/** sort an iterable into an array
 *
 * the sorting function (**prev**, **next**) → *number*
 * should return negative if *prev* should be before *next*,
 * positive if *prev* should be after *next*
 * and zero if there should be no change
 */
function sort(f) {
    return function (xs) {
        return Array.from(xs).sort(f);
    };
}
exports.sort = sort;
/** sort an iterable alphabetically, which is the default sort in Javascript */
function alphabetically(x) {
    return Array.from(x).sort();
}
exports.alphabetically = alphabetically;
/** calculate the sum of an iterable */
exports.sum = foldl(maths_1.add, 0);
/** calculate the sum of an iterable
 *
 * the number used for summation is provided by the function **f**.
 * for example, it could extract the property of an object
 */
const sumBy = (f) => foldl((0, combinator_1.D1)(maths_1.add)(f), 0);
exports.sumBy = sumBy;
/** sort an iterable *by* some property, similar to python's key function */
function by(f) {
    return function (a, b) {
        const fa = f(a);
        const fb = f(b);
        if (fa < fb)
            return -1;
        else if (fa > fb)
            return 1;
        else
            return 0;
    };
}
exports.by = by;
/** get the first element of an iterable */
function first(xs) {
    const first = iter(xs).next();
    return first.done
        ? undefined
        : first.value;
}
exports.first = first;
/** get the last element of an iterable
 *
 * note that this requires walking through the entire iterable
 */
function last(xs) {
    let last = undefined;
    for (const x of xs)
        last = x;
    return last;
}
exports.last = last;
/** join an iterable of strings into a single string */
exports.join = foldl(string_1.concat, '');
/** join an iterable of strings into a single string
 * separated by the delimiter **d**
 *
 * if the iterable is empty, always returns an empty string
 */
const joinWith = (d) => foldl1((0, string_1.concatWith)(d), '');
exports.joinWith = joinWith;
/** test if every member of collection **XS** passes the testing function **F** */
function every(f) {
    return function (xs) {
        for (const x of xs)
            if (!f(x))
                return false;
        return true;
    };
}
exports.every = every;
/** test if at least one member of collection **XS** passes the testing function **F** */
function some(f) {
    return function (xs) {
        for (const x of xs)
            if (f(x))
                return true;
        return false;
    };
}
exports.some = some;
/** test if an argument **X** passes all the functions **FS** */
function and(...fs) {
    return function (x) {
        for (const f of fs)
            if (!f(x))
                return false;
        return true;
    };
}
exports.and = and;
/** test if an argument **X** passes at least one function of **FS** */
function or(...fs) {
    return function (x) {
        for (const f of fs)
            if (f(x))
                return true;
        return false;
    };
}
exports.or = or;
/** limit iterable to N members */
function limit(n) {
    return function* (xs) {
        let i = 0;
        for (const x of xs)
            if (i < n) {
                yield x;
                i++;
            }
            else
                break;
    };
}
exports.limit = limit;
/** infinitely repeat an iterable */
function* repeat(xs) {
    const arr = [];
    for (const x of xs) {
        yield x;
        arr.push(x);
    }
    while (true)
        yield* arr;
}
exports.repeat = repeat;
/** prepend an index to an iterable */
function* enumerate(xs) {
    let i = 0;
    for (const x of xs)
        yield [i++, x];
}
exports.enumerate = enumerate;
/**
 * Apply a function to pairs of elements at the same index in two iterables, collecting the results in a new iterable.
 *
 * If one iterable is longer, elements will be discarded from the longer iterable.
 */
function zipWith(f) {
    return function (as) {
        return function* (bs) {
            const ai = iter(as);
            const bi = iter(bs);
            for (let a = next(ai), b = next(bi); a !== exports.StopIteration && b !== exports.StopIteration; a = next(ai), b = next(bi))
                yield f(a)(b);
        };
    };
}
exports.zipWith = zipWith;
exports.zip = zipWith(duad_1.duad);
/** execute a function on each member of a collection
 *
 * - `f` — the function to execute
 * - `xs` — the collection
 */
function each(f) {
    return function (xs) {
        for (const x of xs)
            f(x);
    };
}
exports.each = each;
function partition(f) {
    return function (xs) {
        const ls = [];
        const rs = [];
        for (const x of xs)
            if (f(x))
                rs.push(x);
            else
                ls.push(x);
        return [ls, rs];
    };
}
exports.partition = partition;
/** search a collection for the first item for which a function returns true */
function find(f) {
    return function (xs) {
        for (const x of xs)
            if (f(x))
                return x;
        return undefined;
    };
}
exports.find = find;
function multifind(...fs) {
    return function (xs) {
        const res = fs.map(() => undefined);
        let remaining = res.length;
        for (const x of xs) {
            for (let i = 0; i < fs.length; i++) {
                if (res[i] !== undefined)
                    continue;
                const f = fs[i];
                if (f(x)) {
                    res[i] = x;
                    remaining--;
                }
            }
            if (remaining === 0)
                return res;
        }
        return res;
    };
}
exports.multifind = multifind;
/** search a collection for the index of first item for which a function returns true */
function findIndex(f) {
    return function (xs) {
        let i = 0;
        for (const x of xs)
            if (f(x))
                return i;
            else
                i++;
        return undefined;
    };
}
exports.findIndex = findIndex;
/** find the optimal value in an iterable (typically minimum or maximum)
 *
 * the definition of optimality is defermined by repeated application of a comparison function.
 *
 * returns undefined on empty iterables
 *
 * - `f` — the comparison function. use `maths/gt` for maximum, and `maths/lt` for minimum
 * - `xs` — the iterable
 */
function optimum(f) {
    return function (xs) {
        const it = iter(xs);
        let v = it.next();
        if (v.done)
            return undefined;
        let max = v.value;
        v = it.next();
        while (!v.done) {
            if (f(max)(v.value))
                max = v.value;
            v = it.next();
        }
        return max;
    };
}
exports.optimum = optimum;
/** find the optimal value in an iterable (typically minimum or maximum)
 *
 * the definition of optimality is defermined by repeated application of a comparison function.
 *
 * before comparing, first map the elements of the iterables through a mapping function to get proper values
 *
 * returns undefined on empty iterables
 *
 * - `map` — the function determining how we get values to be compared out of the elements of the iterables
 * - `f` — the comparison function. use `maths/gt` for maximum, and `maths/lt` for minimum
 * - `xs` — the iterable
 */
function optimumBy(map) {
    return function (comp) {
        return function (xs) {
            const it = iter(xs);
            let v = it.next();
            if (v.done)
                return undefined;
            let max = v.value;
            let maxv = map(v.value);
            v = it.next();
            while (!v.done) {
                const nv = map(v.value);
                if (comp(maxv)(nv)) {
                    max = v.value;
                    maxv = nv;
                }
                v = it.next();
            }
            return max;
        };
    };
}
exports.optimumBy = optimumBy;
/** returns true if any element is truthy */
function any(xs) {
    for (const x of xs)
        if (x)
            return true;
    return false;
}
exports.any = any;
/** returns true if every element is truthy */
function all(xs) {
    for (const x of xs)
        if (!x)
            return false;
    return true;
}
exports.all = all;
/** flattens an iterable of iterables into a continuous iterable */
function* flatten(xs) {
    for (const ys of xs)
        yield* ys;
}
exports.flatten = flatten;
function batch(n) {
    return function* batch(xs) {
        let group = [];
        for (const x of xs) {
            group.push(x);
            if (group.length === n) {
                yield group;
                group = [];
            }
        }
        if (group.length)
            yield group;
    };
}
exports.batch = batch;
function count(xs) {
    const m = new Map();
    for (const x of xs)
        if (m.has(x))
            m.set(x, m.get(x) + 1);
        else
            m.set(x, 1);
    return m;
}
exports.count = count;
