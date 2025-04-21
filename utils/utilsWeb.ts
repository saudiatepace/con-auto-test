export function generateRandomInteger(): number {
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
}

export function getCurrentDay(): number {
    return new Date().getDate()
}

export function getTomorrowDay(): number {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow.getDate()
}
