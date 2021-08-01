export class MissingParameter extends Error {
    constructor(message: string) {
        super(`Missing parameter error: ${message}`)
        this.name = 'MissingParameter'
    }
}