import { MongoHelper } from './helper/mongo-helper'
import { BooksMongodbRepository } from './books-mongodb-repository'
import { AuthorsMongodbRepository } from './authors-mongodb-repository'
describe('BooksMongodbRepository test', () => {
    beforeAll(async () => {
        if(process.env.MONGO_URL){
            await MongoHelper.connect(process.env.MONGO_URL)
        }
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })


    beforeEach( () => {
        MongoHelper.clearCollection('books')
        MongoHelper.clearCollection('authors')
    })

    it('Should add a new book', async () => {
        const sut = new BooksMongodbRepository()
        const authorsRepo = new AuthorsMongodbRepository()

        const author = await authorsRepo.addAuthor({
            name: 'Author 1'
        })
        const result = await sut.addBook({
            name: 'Test Book 1',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })
        expect(result).toMatchObject({
            name: 'Test Book 1',
            publication_year: 2016,
            edition: 1,
            authors: [author.id] 
        })
    })

    it('Should update a book', async () => {
        const sut = new BooksMongodbRepository()
        const authorsRepo = new AuthorsMongodbRepository()

        const author = await authorsRepo.addAuthor({
            name: 'Author 1'
        })
        const addedBook = await sut.addBook({
            name: 'Test Book 1',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        const updatedBook = await sut.updateBook({
            name: 'Updated Book',
            publication_year: 2020,
            edition: 1,
            authors: [author.id]
        }, addedBook.id)

        expect(updatedBook).toMatchObject({
            name: 'Updated Book',
            publication_year: 2020,
            edition: 1,
            authors: [author.id]
        })
    })

    it('Should return list of books', async () => {
        const sut = new BooksMongodbRepository()
        const authorsRepo = new AuthorsMongodbRepository()

        const author = await authorsRepo.addAuthor({
            name: 'Author 1'
        })

        await sut.addBook({
            name: 'Test Book 1',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        await sut.addBook({
            name: 'Test Book 2',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        await sut.addBook({
            name: 'Test Book 3',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        await sut.addBook({
            name: 'Test Book 4',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        const result = await sut.getBooks()
        expect(result.length).toBe(4)
     
    })

    it('Should return list of books by filters', async () => {
        const sut = new BooksMongodbRepository()
        const authorsRepo = new AuthorsMongodbRepository()

        const author = await authorsRepo.addAuthor({
            name: 'Author 1'
        })

        await sut.addBook({
            name: 'Test Book 1',
            publication_year: 2015,
            edition: 1,
            authors: [author.id]
        })

        await sut.addBook({
            name: 'Test Book 2',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        await sut.addBook({
            name: 'Book 3',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        await sut.addBook({
            name: 'Book 4',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        const resultByName = await sut.getBooks({name: 'Book 4'})
        expect(resultByName.length).toBe(1)

        const resultByYear = await sut.getBooks({publication_year: 2016})
        expect(resultByYear.length).toBe(3)

        const resultByEditon = await sut.getBooks({edition: 2})
        expect(resultByEditon.length).toBe(0)

        const resultByAuthor = await sut.getBooks({authors: [author.id]})
        expect(resultByAuthor.length).toBe(4)

        const resultByCombinedFilters = await sut.getBooks({
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })
        expect(resultByCombinedFilters.length).toBe(3)
     
    })

    it('Should delete book by id', async () => {
        const sut = new BooksMongodbRepository()
        const authorsRepo = new AuthorsMongodbRepository()

        const author = await authorsRepo.addAuthor({
            name: 'Author 1'
        })

        await sut.addBook({
            name: 'Test Book 1',
            publication_year: 2016,
            edition: 1,
            authors: [author.id]
        })

        const result = await sut.deleteBook(author.id)
        expect(result).toBe('Deleted')
     
    })

})