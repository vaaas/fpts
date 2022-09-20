"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.spy = exports.compose = exports.pipe = void 0;
function pipe(x, ...fs) {
    let a = x;
    for (const f of fs)
        a = f(a);
    return a;
}
exports.pipe = pipe;
function compose(...fs) {
    return function (x) {
        let a = x;
        for (const f of fs)
            a = f(a);
        return a;
    };
}
exports.compose = compose;
/** spy on a function's calls, recording them
 *
 * calls can be accessed through the `.calls` property
 */
function spy(f) {
    const calls = [];
    function wrapped() {
        calls.push([...arguments]);
        return f(...arguments);
    }
    wrapped.calls = calls;
    return wrapped;
}
exports.spy = spy;
/** only allow a function to be executed once. future calls will return `undefined` */
function once(f) {
    let called = false;
    return function (...xs) {
        if (called)
            return undefined;
        else {
            called = true;
            return f(...xs);
        }
    };
}
exports.once = once;
