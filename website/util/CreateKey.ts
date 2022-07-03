export default function createKey() {
    // The first uuid should be enough, but adding the date to the end should remove collisions
    return `${crypto.randomUUID()}${Date.now()}`
}