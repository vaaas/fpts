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

export const on_transition_end = (e: HTMLElement) => new Promise<TransitionEvent>(f => e.addEventListener('transitionend', f, { once: true }))

export const by_tag_name = (t: string) => Array.from(document.getElementsByTagName(t)) as HTMLElement[];

export function E(name: string, props?: undefined | Record<string, number | string | boolean | Function>, children?: undefined | Array<string | Text | HTMLElement>) {
    const elem = document.createElement(name);
    if (props)
        for (const [k, v] of Object.entries(props))
            // @ts-ignore
            elem[k] = v;
    if (children)
        for (const x of children) {
            if (x instanceof Text || x instanceof HTMLElement)
                elem.appendChild(x)
            else
                elem.appendChild(document.createTextNode(x));
        }
    return elem;
}

export const insert_before = (successor: HTMLElement) => (predecessor: HTMLElement) => {
    successor.parentElement!.insertBefore(predecessor, successor);
    return predecessor;
}
