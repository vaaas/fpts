export const qs = (q: string) => (x: HTMLElement) => x.querySelector(q)
export const qss = (q: string) => (x: HTMLElement) => x.querySelectorAll(q)
export const $ = (q: string) => document.querySelector(q)
export const $$ = (q: string) => document.querySelectorAll(q)
