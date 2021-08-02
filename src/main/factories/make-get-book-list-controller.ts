import { GetBookListController } from "../../adapters/presentation/controllers/get-book-list/get-book-list-controller"
import { BooksMongodbRepository } from "../../infra/data/mongodb/books-mongodb-repository"
import { GetBookList } from "../../usecases/get-book-list/get-book-list"


export const makeGetBookListController = (): GetBookListController => {
    const bookRepo = new BooksMongodbRepository()
    const registerBook = new GetBookList(bookRepo)
    return new GetBookListController(registerBook)
}