import { BookData } from "../../entities/book";
import { AuthorRepositoryInterface } from "../ports/author-repository";
import { BookRepositoryInterface } from "../ports/book-repository";
import { BookResponseData } from "./book-response-data";
import { RegisterBookUseCase } from "./register-book-use-case";

export class RegisterBook implements RegisterBookUseCase {
    private bookRepository: BookRepositoryInterface
    private authorRepository: AuthorRepositoryInterface

    constructor(bookRepo: BookRepositoryInterface, authorRepo: AuthorRepositoryInterface) {
        this.bookRepository = bookRepo
        this.authorRepository = authorRepo
    }

    async registerBook(data: BookData): Promise<BookResponseData> {
        const book = await this.bookRepository.addBook(data)
        const validationResult = await this.validateAuthors(data.authors)
        if(!validationResult) {
            return new Promise((resolve, reject) => reject('Some of the authors were not found'))
        }
        return new Promise(resolve => resolve(book))
    }

    private async validateAuthors(authors: string[]): Promise<boolean> {
        const result = await Promise.allSettled(authors.map((author) => {
            return this.authorRepository.getAuthorById(author)
        }))

        const foundAuthors = result
            .filter(data =>  data.status === 'fulfilled')
            .filter(data =>  {
                if(data.status === 'fulfilled') {
                    return data.value !== null
                }
            })

        const comparison =  foundAuthors.length === authors.length
        return new Promise(resolve => resolve(comparison))
    }

}