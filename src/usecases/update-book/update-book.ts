import { Book, BookData } from "../../entities/book";
import { AuthorRepositoryInterface } from "../ports/author-repository";
import { BookRepositoryInterface } from "../ports/book-repository";
import { BookResponseData } from "../register-book/book-response-data";
import { UpdateBookUseCase } from "./update-book-use-case";
import { validateAuthorsExists }   from '../utils/validate-author-exists'
export class UpdateBook implements UpdateBookUseCase {
    private bookRepository: BookRepositoryInterface
    private authorRepository: AuthorRepositoryInterface

    constructor(bookRepo: BookRepositoryInterface, authorRepository: AuthorRepositoryInterface) {
        this.bookRepository = bookRepo
        this.authorRepository = authorRepository
    }

    async updateBook(data: BookData, id: string): Promise<BookResponseData> {
        if(!await validateAuthorsExists(data.authors, this.authorRepository)) {
            return new Promise((resolve,reject) => reject({message: 'Some authors were not found'}))
        }
        const book = Book.create(data)
        const updatedBook = await this.bookRepository.updateBook(book, id)
        return new Promise(resolve => resolve(updatedBook))
    }
    
}