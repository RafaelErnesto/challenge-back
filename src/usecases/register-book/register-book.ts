import { Book, BookData } from "../../entities/book";
import { AuthorRepositoryInterface } from "../ports/author-repository";
import { BookRepositoryInterface } from "../ports/book-repository";
import { BookResponseData } from "./book-response-data";
import { RegisterBookUseCase } from "./register-book-use-case";
import { validateAuthorsExists } from '../utils/validate-author-exists'
export class RegisterBook implements RegisterBookUseCase {
    private bookRepository: BookRepositoryInterface
    private authorRepository: AuthorRepositoryInterface

    constructor(bookRepo: BookRepositoryInterface, authorRepo: AuthorRepositoryInterface) {
        this.bookRepository = bookRepo
        this.authorRepository = authorRepo
    }

    async registerBook(data: BookData): Promise<BookResponseData> {
        const bookEntity = Book.create(data)
        const book = await this.bookRepository.addBook(data)
        const validationResult = await validateAuthorsExists(data.authors, this.authorRepository)
        if(!validationResult) {
            return new Promise((resolve, reject) => reject({message: 'Some authors were not found'}))
        }
        return new Promise(resolve => resolve(book))
    }

}