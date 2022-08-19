export function next_frame(): Promise<void> {
    return new Promise((yes) => {
        requestAnimationFrame(() => yes())
    });
}

export function next_tick(): Promise<void> {
    return new Promise((yes) => yes());
}
