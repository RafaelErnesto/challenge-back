import { Book } from "../../entities/book";
import { BookRepositoryInterface } from "../ports/book-repository";
import { BookResponseData } from "../register-book/book-response-data";
import { BookOptions, GetBookListUseCase } from "./get-book-list-use-case";

export class GetBookList implements GetBookListUseCase {
    private bookRepository: BookRepositoryInterface

    constructor(bookRepository: BookRepositoryInterface) {
        this.bookRepository = bookRepository
    }

    async getBooks(filters?: BookOptions): Promise<BookResponseData[]> {
        const books = await this.bookRepository.getBooks(filters)
        return new Promise(resolve => resolve(books))
    }
    
}