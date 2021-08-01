import { BookInMemoryRepository } from '../../infra//data//in-memory//book-in-memory-repository'
import { DeleteBookUseCase } from './delete-book-use-case'
import { DeleteBook } from './delete-book'

describe('Delete book usecase test', () => {
    const getSut = (): DeleteBookUseCase => {
        const bookRepo = new BookInMemoryRepository()
        const sut = new DeleteBook(bookRepo)
        return sut
    }

    it('Returns success message when book is deleted', async () => {
        const sut = getSut()
        const result = await sut.deleteBook('l8cs')
        expect(result).toEqual('The book was deleted')
    })
})