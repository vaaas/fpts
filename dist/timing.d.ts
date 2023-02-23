export declare function next_tick(f: () => any): number;
/** throttle a function, so that multiple calls execute at most once per **t** milliseconds */
export declare function throttle<T>(f: (x: T) => any, t: number): (x: T) => any;
/** debounce a function, so that multiple calls execute only once after **t** milliseconds of delay */
export declare function debounce<T>(f: (x: T) => any, t: number): (x: T) => void;
/** debounce a function, so that multiple calls execute only once when time is available */
export declare function microtask<T extends Array<any>>(f: (...xs: T) => void): (...xs: T) => void;
export declare function on_next_frame<T extends Array<any>>(f: (...xs: T) => void): (...xs: T) => void;
export declare function once<T extends Array<any>>(f: (...xs: T) => void | Promise<void>): (...xs: T) => void;
