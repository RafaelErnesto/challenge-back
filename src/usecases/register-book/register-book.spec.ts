import { RegisterBook } from './register-book'
import { BookInMemoryRepository } from '../../infra/data/in-memory/book-in-memory-repository'
import { RegisterBookUseCase } from './register-book-use-case'

describe('Register book use case test', () => {
    const getSut = (): RegisterBookUseCase => {
        const bookRepo = new BookInMemoryRepository()
        const sut = new RegisterBook(bookRepo)
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
})