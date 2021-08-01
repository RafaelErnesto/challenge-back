import { BookRepositoryInterface } from "../ports/book-repository";
import { DeleteBookUseCase } from "./delete-book-use-case";

export class DeleteBook implements DeleteBookUseCase {
    private bookRepository: BookRepositoryInterface

    constructor(bookRepo: BookRepositoryInterface) {
        this.bookRepository = bookRepo
    }

    async deleteBook(id: string): Promise<string> {
        await this.bookRepository.deleteBook(id)
        return new Promise(resolve => resolve('The book was deleted'))
    }
    
}