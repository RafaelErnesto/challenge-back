export class NegativePublicationYearNumber extends Error {

    constructor() {
        super(`The publication_year number can't be negative`)
        this.name = 'NegativePublicationYearNumber'
    }
}