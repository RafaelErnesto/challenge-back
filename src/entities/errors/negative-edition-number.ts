export class NegativeEditionNumber extends Error {

    constructor() {
        super(`The edition number can't be negative`)
        this.name = 'NegativeEditionNumber'
    }
}