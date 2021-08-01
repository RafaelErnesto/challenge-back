import { BaseController } from '../http/base-controller'
import { RegisterBook } from '../../../../usecases/register-book/register-book'
import { AuthorInMemoryRepository } from '../../../../infra/data/in-memory/author-in-memory-repository'
import { RegisterBookController } from './register-book-controller'
import { BookInMemoryRepository } from '../../../../infra/data/in-memory/book-in-memory-repository'

describe('RegisterBook controller test', () => {
    const getSut = (): BaseController => {
        const bookRepo = new BookInMemoryRepository()
        const authorRepo = new AuthorInMemoryRepository()
        const registerBook = new RegisterBook(bookRepo, authorRepo)
        const getAuthorListController = new RegisterBookController(registerBook)
        return getAuthorListController
    }
    it('Returns statusCode 201 and book data', async () => {
        const sut = getSut()
        const response = await sut.handle({
            body: {
                name:'Typescript Book',
                edition: 1,
                publication_year: 2021,
                authors: ['b9jg','vb46']
            }
        })
        expect(response.statusCode).toBe(201)
    })

})