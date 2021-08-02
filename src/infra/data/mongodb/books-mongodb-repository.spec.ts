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

    it('Should update a book', async () => {
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

})