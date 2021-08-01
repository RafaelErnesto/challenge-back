import { BaseController } from '../http/base-controller'
import { BookInMemoryRepository } from '../../../../infra/data/in-memory/book-in-memory-repository'
import { UpdateBook } from '../../../../usecases//update-book/update-book'
import { AuthorInMemoryRepository } from '../../../../infra/data/in-memory/author-in-memory-repository'
import { UpdateBookController } from './update-book-controller'
describe('UpdateBookController test', () => {
    const getSut = (): BaseController => {
        const bookRepo = new BookInMemoryRepository()
        const authorRepo = new AuthorInMemoryRepository()
        const getBookList = new UpdateBook(bookRepo, authorRepo)
        return new UpdateBookController(getBookList)
    }

    it('Ensure UpdateBookController returns statusCode 200 and updated book', async () => {
        const sut = getSut()
        const response = await sut.handle({
            body: {
                name: 'Updated Book',
                edition: 1,
                publication_year: 2001,
                authors: ['b9jg'],
                id: 'asm3'
            }
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Updated Book')
    })

    it('Ensure UpdateBookController returns statusCode 400 when parameter is missing', async () => {
        const sut = getSut()
        expect(async () => {
            await sut.handle({
                body: {
                    edition: 1,
                    publication_year: 2001,
                    authors: ['b9jg'],
                    id: 'asm3'
                }
            })
        }).rejects.toBeInstanceOf('MissingParamterError')
    })
})