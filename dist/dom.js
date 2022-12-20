"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byId = exports.set_class = exports.has_class = exports.does_not_have_class = exports.$$ = exports.$ = exports.qss = exports.qs = void 0;
const qs = (q) => (x) => x.querySelector(q);
exports.qs = qs;
const qss = (q) => (x) => x.querySelectorAll(q);
exports.qss = qss;
const $ = (q) => document.querySelector(q);
exports.$ = $;
const $$ = (q) => document.querySelectorAll(q);
exports.$$ = $$;
const does_not_have_class = (c) => (x) => !x.classList.contains(c);
exports.does_not_have_class = does_not_have_class;
const has_class = (c) => (x) => x.classList.contains(c);
exports.has_class = has_class;
const set_class = (e, c, b) => {
    if (b)
        e.classList.add(c);
    else
        e.classList.remove(c);
    return e;
};
exports.set_class = set_class;
const byId = (c) => document.getElementById(c);
exports.byId = byId;
