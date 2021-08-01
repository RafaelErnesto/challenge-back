import { BookData } from "../../entities/book";
import { BookRepositoryInterface } from "../ports/book-repository";
import { BookResponseData } from "./book-response-data";
import { RegisterBookUseCase } from "./register-book-use-case";

export class RegisterBook implements RegisterBookUseCase {
    private bookRepository: BookRepositoryInterface

    constructor(bookRepo: BookRepositoryInterface) {
        this.bookRepository = bookRepo
    }

    async registerBook(data: BookData): Promise<BookResponseData> {
        const book = await this.bookRepository.addBook(data)
        return new Promise(resolve => resolve(book))
    }

}