import { AuthorInMemoryRepository } from '../../../../infra/data/in-memory/author-in-memory-repository'
import { GetAuthorList } from '../../../../usecases/get-author-list/get-author-list'
import { BaseController } from '../http/base-controller'
import { GetAuthorListController } from './get-author-list-controller'

describe('GetAuthorListController test', () => {
    const getSut = (): BaseController => {
        const authorRepo = new AuthorInMemoryRepository()
        const getAuthorList = new GetAuthorList(authorRepo)
        const getAuthorListController = new GetAuthorListController(getAuthorList)
        return getAuthorListController
    }
    it('Should return statusCode 200 and authors list', async () => {
        const sut = getSut()
        const response = await sut.handle({})
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })
    it('Should return statusCode 200 and filtered authors list', async () => {
        const sut = getSut()
        const response = await sut.handle({
            body: {
                filter: 'J'
            }
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(3)
    })
})