"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mock = exports.compose = exports.pipe = void 0;
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
function mock(f) {
    const calls = [];
    function wrapped() {
        calls.push(arguments);
        return f(...arguments);
    }
    wrapped.calls = calls;
    return wrapped;
}
exports.mock = mock;
