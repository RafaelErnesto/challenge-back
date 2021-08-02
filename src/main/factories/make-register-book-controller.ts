import { RegisterBookController } from "../../adapters/presentation/controllers/register-book/register-book-controller"
import { AuthorsMongodbRepository } from "../../infra/data/mongodb/authors-mongodb-repository"
import { BooksMongodbRepository } from "../../infra/data/mongodb/books-mongodb-repository"
import { RegisterBook } from "../../usecases/register-book/register-book"


export const makeRegisterBookController = (): RegisterBookController => {
    const bookRepo = new BooksMongodbRepository()
    const authorRepo = new AuthorsMongodbRepository()
    const registerBook = new RegisterBook(bookRepo,authorRepo)
    return new RegisterBookController(registerBook)
}