"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_before = exports.E = exports.by_tag_name = exports.on_transition_end = exports.byId = exports.set_class = exports.has_class = exports.does_not_have_class = exports.$$ = exports.$ = exports.qss = exports.qs = void 0;
const qs = (q) => (x) => x.querySelector(q);
exports.qs = qs;
const qss = (q) => (x) => x.querySelectorAll(q);
exports.qss = qss;
const $ = (q) => document.querySelector(q);
exports.$ = $;
const $$ = (q) => Array.from(document.querySelectorAll(q));
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
const on_transition_end = (e) => new Promise(f => e.addEventListener('transitionend', f, { once: true }));
exports.on_transition_end = on_transition_end;
const by_tag_name = (t) => Array.from(document.getElementsByTagName(t));
exports.by_tag_name = by_tag_name;
function E(name, props, children) {
    const elem = document.createElement(name);
    if (props)
        for (const [k, v] of Object.entries(props))
            // @ts-ignore
            elem[k] = v;
    if (children)
        for (const x of children) {
            if (x instanceof Text || x instanceof HTMLElement)
                elem.appendChild(x);
            else
                elem.appendChild(document.createTextNode(x));
        }
    return elem;
}
exports.E = E;
const insert_before = (successor) => (predecessor) => {
    successor.parentElement.insertBefore(predecessor, successor);
    return predecessor;
};
exports.insert_before = insert_before;
