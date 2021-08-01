import { InvalidBookName } from './errors/invalid-book-name'
import { NegativeEditionNumber } from './errors/negative-edition-number'
import { NegativePublicationYearNumber } from './errors/negative-publication-year'
import { EmptyAuthorsArray } from './errors/empty-authors-array'
export interface BookData {
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
        Book.validate(data)
        return new Book(data.name, data.edition, data.publication_year, data.authors)
    }

    private static validate(data: BookData) {
        if(data.name.length === 0) {
            throw new InvalidBookName(data.name)
        }

        if(data.edition < 0) {
            throw new NegativeEditionNumber()
        }

        if(data.publication_year < 0) {
            throw new NegativePublicationYearNumber()
        }

        if(data.authors.length === 0) {
            throw new EmptyAuthorsArray()
        }
    }
}