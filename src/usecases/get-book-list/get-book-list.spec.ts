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

    it('Retrieve book by name', async () => {
        const sut = getSut()
        const result = await sut.getBooks({name: "Book 1"})
        expect(result[0].name).toEqual("Book 1")
        expect(result.length).toEqual(1)
    })

    it('Retrieve book by publication year', async () => {
        const sut = getSut()
        const result = await sut.getBooks({publication_year: 2018})
        expect(result[0].publication_year).toEqual(2018)
        expect(result.length).toEqual(1)
    })
})