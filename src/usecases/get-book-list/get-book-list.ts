import { Book } from "../../entities/book";
import { BookRepositoryInterface } from "../ports/book-repository";
import { BookResponseData } from "../register-book/book-response-data";
import { GetBookListUseCase } from "./get-book-list-use-case";

export class GetBookList implements GetBookListUseCase {
    private bookRepository: BookRepositoryInterface

    constructor(bookRepository: BookRepositoryInterface) {
        this.bookRepository = bookRepository
    }

    async getBooks(filters?: any[]): Promise<BookResponseData[]> {
        const books = await this.bookRepository.getBooks()
        return new Promise(resolve => resolve(books))
    }
    
}