import { Book, BookData } from "../../../entities/book";
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
        const bookEntity = new Book(name, edition, publication_year, authors)
        this.books.push(bookEntity)
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
        const book = new Book(data.name, data.edition, data.publication_year, data.authors)
        bookToUpdate.name = book.name
        bookToUpdate.publication_year = book.publication_year
        bookToUpdate.edition = book.edition
        bookToUpdate.authors = book.authors
        return new Promise(resolve => resolve(bookToUpdate))
    }

    deleteBook(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}