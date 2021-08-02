import { AuthorData } from "../../../entities/author";
import { AuthorRepositoryInterface, AuthorResponseData } from "../../../usecases/ports/author-repository";
import { MongoHelper } from "./helper/mongo-helper";
import { ObjectId } from 'mongodb'

export class AuthorsMongodbRepository implements AuthorRepositoryInterface {
    async getAllAuthors(page: number, filter?: string): Promise<AuthorResponseData[]> {
        let filters = {}
        if(filter) {
            filters = { name: filter} 
        }
        return await MongoHelper.getCollection('authors').find(filters).skip(page).limit(10).toArray()
    }
    getAuthorByName(name: string): Promise<AuthorResponseData> {
        throw new Error("Method not implemented.");
    }
    async getAuthorById(id: any): Promise<AuthorResponseData> {
        const author =  await MongoHelper.getCollection('authors').find({'_id': new ObjectId(id)}).toArray()
        return new Promise(resolve => resolve({
            name: author[0].name,
            id: author[0]._id
        }))
    }
    async addAuthor(data: AuthorData): Promise<AuthorResponseData> {
        const authorCollection = MongoHelper.getCollection('authors')
        const author = await authorCollection.insertOne(data)
        return new Promise(resolve => resolve({
            name: data.name,
            id: author.insertedId.toHexString()
        }))
    }
    
}