import { MongoHelper } from './helper/mongo-helper'
import { AuthorsMongodbRepository } from './authors-mongodb-repository'

describe('AuthorsMongodbRepository test', () => {
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

    it('Get all authors from the database', async () => {
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

       await sut.addAuthor({
            name: 'Author 4'
       })

       const result = await sut.getAllAuthors(0)
       expect(result.length).toBe(4)
    })

    it('Get filtered authors from the database', async () => {
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
 
        await sut.addAuthor({
             name: 'Author 4'
        })
 
        const result = await sut.getAllAuthors(0, 'Author 3')
        expect(result.length).toBe(1)
     })
})