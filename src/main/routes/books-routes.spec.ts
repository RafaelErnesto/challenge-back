import request from 'supertest'
import app  from '../config/app'
import { MongoHelper } from '../../infra/data/mongodb/helper/mongo-helper'
import { AuthorsMongodbRepository } from '../../infra/data/mongodb/authors-mongodb-repository'
import { BooksMongodbRepository } from '../../infra/data/mongodb/books-mongodb-repository'

describe('Books routes test', () => {
    beforeAll(async () => {
        if(process.env.MONGO_URL){
            await MongoHelper.connect(process.env.MONGO_URL)
        }
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach( () => {
        MongoHelper.clearCollection('authors')
        MongoHelper.clearCollection('books')
    })

    it('Should return statusCode 201 and created book', async () => {

        const authorRepo = new AuthorsMongodbRepository()

        const bookRepo = new BooksMongodbRepository()

        const author = await authorRepo.addAuthor({
            name: 'Author 1'
        })
 
        const response = await request(app)
        .post('/api/book')
        .send({
            name: 'Title 1',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })
        .expect(201)
    },20000)

    it('Should return statusCode 400 when paramter is missing', async () => {

        const authorRepo = new AuthorsMongodbRepository()

        const bookRepo = new BooksMongodbRepository()

        const author = await authorRepo.addAuthor({
            name: 'Author 1'
        })
        
        request(app)
            .post('/api/book')
            .send({
                edition: 2,
                publication_year: 2014,
                authors:[author.id]
            }).expect(400)
   
    })

    it('Should return statusCode 200 and list of books', async () => {

        const authorRepo = new AuthorsMongodbRepository()

        const bookRepo = new BooksMongodbRepository()

        const author = await authorRepo.addAuthor({
            name: 'Author 1'
        })

        await bookRepo.addBook({
            name: 'Title 1',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })

        await bookRepo.addBook({
            name: 'Title 2',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })

        await bookRepo.addBook({
            name: 'Title 3',
            edition: 1,
            publication_year: 2020,
            authors:[author.id]
        })
 
        const response = await request(app)
        .get('/api/book')
        .expect(200)

        expect(response.body.length).toBe(3)
    },20000)

    it('Should return statusCode 200 and list of filtered books by edition', async () => {

        const authorRepo = new AuthorsMongodbRepository()

        const bookRepo = new BooksMongodbRepository()

        const author = await authorRepo.addAuthor({
            name: 'Author 1'
        })

        await bookRepo.addBook({
            name: 'Title 1',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })

        await bookRepo.addBook({
            name: 'Title 2',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })

        await bookRepo.addBook({
            name: 'Title 3',
            edition: 1,
            publication_year: 2020,
            authors:[author.id]
        })
 
        const response = await request(app)
        .get('/api/book?edition=2')
        .expect(200)

        expect(response.body.length).toBe(2)
    }, 20000)

    it('Should return statusCode 200 and list of filtered books by edition and publication_year', async () => {

        const authorRepo = new AuthorsMongodbRepository()

        const bookRepo = new BooksMongodbRepository()

        const author = await authorRepo.addAuthor({
            name: 'Author 1'
        })

        await bookRepo.addBook({
            name: 'Title 1',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })

        await bookRepo.addBook({
            name: 'Title 2',
            edition: 2,
            publication_year: 2011,
            authors:[author.id]
        })

        await bookRepo.addBook({
            name: 'Title 3',
            edition: 1,
            publication_year: 2020,
            authors:[author.id]
        })
 
        const response = await request(app)
        .get('/api/book?edition=2&publication_year=2014')
        .expect(200)

        expect(response.body.length).toBe(1)
    }, 20000)

    it('Should return statusCode 200 and updated book', async () => {

        const authorRepo = new AuthorsMongodbRepository()

        const bookRepo = new BooksMongodbRepository()

        const author = await authorRepo.addAuthor({
            name: 'Author 1'
        })

        const book = await bookRepo.addBook({
            name: 'Title 1',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })

        const response = await request(app)
        .put(`/api/book/${book.id}`)
        .send({
            name: 'Updated Title',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })
        .expect(200)
        
        expect(response.body).toMatchObject({
            name: 'Updated Title',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })
    }, 20000)

    it('Should return statusCode 204 on deletion', async () => {

        const authorRepo = new AuthorsMongodbRepository()

        const bookRepo = new BooksMongodbRepository()

        const author = await authorRepo.addAuthor({
            name: 'Author 1'
        })

        const book = await bookRepo.addBook({
            name: 'Title 1',
            edition: 2,
            publication_year: 2014,
            authors:[author.id]
        })

        request(app)
        .delete(`/api/book/${book.id}`)
        .expect(204)
    }, 20000)
})