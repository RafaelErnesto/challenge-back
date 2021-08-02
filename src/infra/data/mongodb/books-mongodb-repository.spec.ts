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

})