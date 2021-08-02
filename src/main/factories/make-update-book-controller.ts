import { UpdateBookController } from "../../adapters/presentation/controllers/update-book/update-book-controller"
import { AuthorsMongodbRepository } from "../../infra/data/mongodb/authors-mongodb-repository"
import { BooksMongodbRepository } from "../../infra/data/mongodb/books-mongodb-repository"
import { UpdateBook } from "../../usecases/update-book/update-book"


export const makeUpdateBookController = (): UpdateBookController => {
    const bookRepo = new BooksMongodbRepository()
    const authorRepo = new AuthorsMongodbRepository()
    const updateBook = new UpdateBook(bookRepo,authorRepo)
    return new UpdateBookController(updateBook)
}