import { GetBookList } from '../../../../usecases/get-book-list/get-book-list'
import { BookInMemoryRepository } from '../../../../infra/data/in-memory/book-in-memory-repository'
import { GetBookListController } from './get-book-list-controller'
import { BaseController } from '../http/base-controller'

describe('GetBookController test', () => {
    const getSut = (): BaseController => {
        const bookRepo = new BookInMemoryRepository()
        const getBookList = new GetBookList(bookRepo)
        const getAuthorListController = new GetBookListController(getBookList)
        return getAuthorListController
    }
    it('Ensure GetBookController returns statusCode 200 and list of books', async () => {
        const sut = getSut()
        const books = await sut.handle({})
        expect(books.statusCode).toBe(200)
        expect(books.body.length).toEqual(2)
    })

    it('Ensure GetBookController returns statusCode 200 and list of books filtered by name', async () => {
        const sut = getSut()
        const books = await sut.handle({
            body: {
                filters: {
                    name: 'Book 2'
                }
            }
        })
        expect(books.statusCode).toBe(200)
        expect(books.body.length).toEqual(1)
        expect(books.body[0].name).toEqual('Book 2')
    })
})