import { Book, BookData } from "../../entities/book";
import { BookRepositoryInterface } from "../ports/book-repository";
import { BookResponseData } from "../register-book/book-response-data";
import { UpdateBookUseCase } from "./update-book-use-case";

export class UpdateBook implements UpdateBookUseCase {
    private bookRepository: BookRepositoryInterface

    constructor(bookRepo: BookRepositoryInterface) {
        this.bookRepository = bookRepo
    }

    async updateBook(data: BookData, id: string): Promise<BookResponseData> {
        const book = Book.create(data)
        const updatedBook = await this.bookRepository.updateBook(book, id)
        return new Promise(resolve => resolve(updatedBook))
    }
    
}