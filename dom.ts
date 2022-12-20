export const qs = (q: string) => (x: HTMLElement) => x.querySelector(q)
export const qss = (q: string) => (x: HTMLElement) => x.querySelectorAll(q)
export const $ = (q: string) => document.querySelector(q)
export const $$ = (q: string) => Array.from(document.querySelectorAll(q))

export const does_not_have_class = (c: string) => (x: HTMLElement) => !x.classList.contains(c)

export const has_class = (c: string) => (x: HTMLElement) => x.classList.contains(c)

export const set_class = (e: HTMLElement, c: string, b: boolean) => {
    if (b)
        e.classList.add(c)
    else
        e.classList.remove(c)
    return e;
}

export const byId = (c: string) => document.getElementById(c)
