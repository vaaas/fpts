export declare const qs: (q: string) => (x: HTMLElement) => Element | null;
export declare const qss: (q: string) => (x: HTMLElement) => NodeListOf<Element>;
export declare const $: (q: string) => Element | null;
export declare const $$: (q: string) => Element[];
export declare const does_not_have_class: (c: string) => (x: HTMLElement) => boolean;
export declare const has_class: (c: string) => (x: HTMLElement) => boolean;
export declare const set_class: (e: HTMLElement, c: string, b: boolean) => HTMLElement;
export declare const byId: (c: string) => HTMLElement | null;