import { AuthorInMemoryRepository } from '../../infra/data/in-memory/author-in-memory-repository'
import { GetAuthorList } from './get-author-list'
describe('Get author list test', () => {
    it('Get author list', async () => {
        const inMemoryRepo = new AuthorInMemoryRepository()
        const sut = new GetAuthorList(inMemoryRepo)
        const authors = await sut.getAuthorList()
        expect(authors.length).toBeGreaterThan(0)
    })
})