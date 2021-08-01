import { UpdateBookUseCase } from './update-book-use-case'
import { BookInMemoryRepository } from '../../infra//data/in-memory/book-in-memory-repository'
import { AuthorInMemoryRepository } from '../../infra//data//in-memory/author-in-memory-repository'
import { UpdateBook } from './update-book'

describe('Update Book Test', () => {
    const getSut = (): UpdateBookUseCase => {
        const bookRepo = new BookInMemoryRepository()
        const authorRepo = new AuthorInMemoryRepository()
        const sut = new UpdateBook(bookRepo, authorRepo)
        return sut
    }
    it('Ensure UpdateBook usercase returns updated book on success', async () => {
        const sut = getSut()
        const result = await sut.updateBook({
            name: "Update",
            publication_year: 2011,
            edition:1,
            authors:["m3sd"]
        },"asm3")

        expect(result.publication_year).toEqual(2011)
        expect(result.name).toEqual('Update')
    })

    it('Ensure UpdateBook usercase throws when author do not exist', () => {
        const sut = getSut()
        expect(async () => {await sut.updateBook({
            name: "Update",
            publication_year: 2011,
            edition:1,
            authors:["test"]
        },"asm3")}
        ).rejects.toMatch('Some authors were not found')
    })
})