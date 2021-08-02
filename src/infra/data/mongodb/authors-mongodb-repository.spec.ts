import { MongoHelper } from './helper/mongo-helper'

const getMongoUrl = async () => {
    return process.env.MONGO_URL
}
describe('AuthorsMongodbRepository test', () => {
    beforeAll(async () => {
        if(process.env.MONGO_URL){
            await MongoHelper.connect(process.env.MONGO_URL)
        }
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    it('Get all authors from the database', () => {
       
    })
})