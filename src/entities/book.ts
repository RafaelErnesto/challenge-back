
interface BookData {
    name: string
    edition: number
    publication_year: number
    authors: string[]
}

export class Book {

    public readonly name: string
    public readonly edition: number
    public readonly publication_year: number
    public readonly authors: string[]

    constructor(name: string, edition: number, publication_year: number, authors: string[]) {
        this.name = name
        this.edition = edition
        this.publication_year = publication_year
        this.authors = authors
    }

    public static create(data: BookData) {
        return new Book(data.name, data.edition, data.publication_year, data.authors)
    }
}