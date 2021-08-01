import { RegisterBook } from './register-book'
import { BookInMemoryRepository } from '../../infra/data/in-memory/book-in-memory-repository'
import { RegisterBookUseCase } from './register-book-use-case'
import { AuthorInMemoryRepository } from '../../infra/data/in-memory/author-in-memory-repository'
describe('Register book use case test', () => {
    const getSut = (): RegisterBookUseCase => {
        const bookRepo = new BookInMemoryRepository()
        const authorRepo = new AuthorInMemoryRepository()
        const sut = new RegisterBook(bookRepo, authorRepo)
        return sut
    }

    it('Register book when all provided data is correct', async ()=> {
        const sut = getSut()
        const response = await sut.registerBook({
            name:"Test Book",
            publication_year: 2021,
            edition: 2,
            authors:["qa4t"]
        })
       
        expect(response).toHaveProperty('id')
    })

    it('Ensure RegisterBook throws when authors provided do not exist', ()=> {
        const sut = getSut()
        expect(async () => {
            await sut.registerBook({
                name:"Test Book",
                publication_year: 2021,
                edition: 2,
                authors:["test", "test2"]
            })
        }).rejects.toEqual('Some of the authors were not found')
       
    })
})