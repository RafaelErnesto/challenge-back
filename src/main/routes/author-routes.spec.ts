import request from 'supertest'
import app  from '../config/app'
import { MongoHelper } from '../../infra/data/mongodb/helper/mongo-helper'
import { AuthorsMongodbRepository } from '../../infra/data/mongodb/authors-mongodb-repository'
describe('Author routes test', () => {
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
    })

    it('Should return statusCode 200 and list of authors', async () => {

        const sut = new AuthorsMongodbRepository()

        await sut.addAuthor({
            name: 'Author 1'
        })
 
        await sut.addAuthor({
            name: 'Author 2'
        })
 
        await sut.addAuthor({
             name: 'Author 3'
        })

        const response = await request(app)
        .get('/api/author')
        .expect(200)
        expect(response.body.length).toBe(3)
    })

    it('Should return statusCode 200 and list of filtered authors', async () => {

        const sut = new AuthorsMongodbRepository()

        await sut.addAuthor({
            name: 'Author 1'
        })
 
        await sut.addAuthor({
            name: 'Author 2'
        })
 
        await sut.addAuthor({
             name: 'Author 3'
        })

        const response = await request(app)
        .get('/api/author?name=Author 1')
        .expect(200)
        expect(response.body.length).toBe(1)
    })
})