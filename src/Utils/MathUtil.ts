export function square(x: number) {
    
    return x * x
}

export function generateId(): number {

    return Math.floor((Math.random() * 100000) + 1)
}