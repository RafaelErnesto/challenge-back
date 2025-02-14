import { BookData } from "../../../entities/book";
import { BookOptions } from "../../../usecases/get-book-list/get-book-list-use-case";
import { BookRepositoryInterface } from "../../../usecases/ports/book-repository";
import { BookResponseData } from "../../../usecases/register-book/book-response-data";
import booksData from './books.json'
export class BookInMemoryRepository implements BookRepositoryInterface {
    private books: any
    constructor() {
        this.books = booksData
    }
    addBook(data: BookData): Promise<BookResponseData> {
        const {name, edition, publication_year, authors} = data
        this.books.push(data)
        return new Promise(resolve => resolve({
            name,
            edition,
            publication_year,
            authors,
            id: "aqe5"
        }))
    }
    getBooks(filters?: BookOptions): Promise<BookResponseData[]> {
        let result = this.books
        if(filters?.name) {
            result = result.filter((book: any) => book.name === filters.name)
        }
        if(filters?.publication_year) {
            result = result.filter((book: any) => book.publication_year === filters.publication_year)
        }
        if(filters?.edition) {
            result = result.filter((book: any) => book.edition === filters.edition)
        }

        if(filters?.authors) {
            result = result.filter((book: any) => JSON.stringify(book.authors) === JSON.stringify(filters.authors))
        }
        return new Promise(resolve => resolve(result))
    }

    updateBook(data: BookData, id: string): Promise<BookResponseData> {
        const bookToUpdate = this.books.filter((book: BookResponseData) => book.id === id)
        bookToUpdate.name = data.name
        bookToUpdate.publication_year = data.publication_year
        bookToUpdate.edition = data.edition
        bookToUpdate.authors = data.authors
        return new Promise(resolve => resolve(bookToUpdate))
    }

    deleteBook(id: string): Promise<string> {
        this.books = this.books.filter((book: BookResponseData) => book.id !== id)
        return new Promise(resolve => resolve('Deleted'))
    }
    
}