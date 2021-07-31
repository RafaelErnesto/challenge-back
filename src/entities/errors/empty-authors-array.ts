export class EmptyAuthorsArray extends Error {

    constructor() {
        super(`The authors array can't be empty`)
        this.name = 'EmptyAuthorsArray'
    }
}