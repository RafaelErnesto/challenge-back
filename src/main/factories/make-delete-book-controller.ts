import { DeleteBookController } from "../../adapters/presentation/controllers/delete-book/delete-book-controller"
import { BooksMongodbRepository } from "../../infra/data/mongodb/books-mongodb-repository"
import { DeleteBook } from "../../usecases/delete-book/delete-book"


export const makeDeleteBookController = (): DeleteBookController => {
    const bookRepo = new BooksMongodbRepository()
    const deleteBook = new DeleteBook(bookRepo)
    return new DeleteBookController(deleteBook)
}