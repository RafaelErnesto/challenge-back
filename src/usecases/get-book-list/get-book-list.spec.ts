import { BookInMemoryRepository } from '../../infra/data/in-memory/book-in-memory-repository'
import { GetBookListUseCase } from './get-book-list-use-case'
import { GetBookList } from './get-book-list'
describe('Get books test', () => {
    const getSut = (): GetBookListUseCase => {
        const bookRepo = new BookInMemoryRepository()
        const sut = new GetBookList(bookRepo)
        return sut
    }

    it('Retrieve all books when no filter is provided', async () => {
        const sut = getSut()
        const result = await sut.getBooks()
        expect(result.length).toBeGreaterThan(0)
    })
})