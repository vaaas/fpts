export function next_frame(): Promise<void> {
    return new Promise((yes) => {
        requestAnimationFrame(() => yes())
    })
}

export function next_tick(): Promise<void> {
    return new Promise((yes) => yes())
}

export function sleep(n: number): Promise<void> {
    return new Promise(yes => setTimeout(() => yes(), n))
}
