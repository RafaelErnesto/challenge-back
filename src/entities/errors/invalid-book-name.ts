export class InvalidBookName extends Error {

    constructor(name: string) {
        super(`The name:  ${name} is invalid`)
        this.name = 'InvalidBookName'
    }
}