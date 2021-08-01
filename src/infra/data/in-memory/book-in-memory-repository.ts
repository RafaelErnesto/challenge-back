import { Book, BookData } from "../../../entities/book";
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
    getBooks(filters?: any): Promise<BookResponseData[]> {
        return new Promise(resolve => resolve(this.books))
    }
    updateBook(data: BookData): Promise<BookResponseData> {
        throw new Error("Method not implemented.");
    }
    deleteBook(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}