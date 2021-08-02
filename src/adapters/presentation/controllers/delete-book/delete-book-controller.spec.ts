import  { BaseController } from '../http/base-controller'
import { BookInMemoryRepository } from '../../../../infra/data/in-memory/book-in-memory-repository'
import { DeleteBook } from '../../../../usecases/delete-book/delete-book'
import { DeleteBookController } from './delete-book-controller'
describe('DeleteBookController test', () => {
    const getSut = (): BaseController => {
        const bookRepo = new BookInMemoryRepository()
        const deleteBook = new DeleteBook(bookRepo)
        return new DeleteBookController(deleteBook)
    }

    it('Ensure DeleteBookController returns 204 ', async () => {
        const sut = getSut()
        const response = await sut.handle({
            body: 'mlp7'
        })

        expect(response.statusCode).toBe(204)
    })
})