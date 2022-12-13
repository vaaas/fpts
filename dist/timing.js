"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.on_next_frame = exports.microtask = exports.debounce = exports.throttle = exports.next_tick = void 0;
const data_1 = require("./data");
function next_tick(f) {
    return setTimeout(f, 0);
}
exports.next_tick = next_tick;
/** throttle a function, so that multiple calls execute at most once per **t** milliseconds */
function throttle(f, t) {
    let nextValue = data_1.NoValue;
    let id;
    return (function throttle(x) {
        if (id)
            nextValue = x;
        else {
            nextValue = data_1.NoValue;
            id = setTimeout(() => {
                if (nextValue !== data_1.NoValue)
                    f(nextValue);
                id = undefined;
            }, t);
            f(x);
        }
    });
}
exports.throttle = throttle;
/** debounce a function, so that multiple calls execute only once after **t** milliseconds of delay */
function debounce(f, t) {
    let id;
    return (function debounce(x) {
        if (id) {
            clearTimeout(id);
            id = undefined;
        }
        id = setTimeout(() => {
            f(x);
            id = undefined;
        }, t);
    });
}
exports.debounce = debounce;
/** debounce a function, so that multiple calls execute only once when time is available */
function microtask(f) {
    let running = false;
    let args = [];
    return function microtask(...xs) {
        if (running) {
            args = xs;
            return;
        }
        running = true;
        args = xs;
        queueMicrotask(() => {
            f(...args);
            args = [];
            running = false;
        });
    };
}
exports.microtask = microtask;
function on_next_frame(f) {
    let running = false;
    let args = [];
    return function on_next_frame(...xs) {
        if (running) {
            args = xs;
            return;
        }
        running = true;
        args = xs;
        requestAnimationFrame(() => {
            f(...args);
            args = [];
            running = false;
        });
    };
}
exports.on_next_frame = on_next_frame;
function once(f) {
    let running = false;
    return function once(...xs) {
        if (running)
            return;
        running = true;
        const x = f(...xs);
        if (x instanceof Promise)
            x.finally(() => running = false);
        else
            running = false;
    };
}
exports.once = once;
