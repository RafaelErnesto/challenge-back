import { AuthorInMemoryRepository } from '../../infra/data/in-memory/author-in-memory-repository'
import { GetAuthorList } from './get-author-list'
import { GetAuthorListUseCase } from './get-author-list-use-case'
describe('Get author list test', () => {
    const getSut = (): GetAuthorListUseCase => {
        const inMemoryRepo = new AuthorInMemoryRepository()
       return  new GetAuthorList(inMemoryRepo)
    }
    it('Get author list', async () => {
        const sut = getSut()
        const authors = await sut.getAuthorList()
        expect(authors.length).toBe(11)
    })

    it('Get author filtered author list', async () => {
        const sut = getSut()
        const authors = await sut.getAuthorList(1,'J')
        expect(authors.length).toBe(3)
    })
})