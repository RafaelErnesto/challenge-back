import { AuthorData } from "../../../entities/author";
import { AuthorRepositoryInterface, AuthorResponseData } from "../../../usecases/ports/author-repository";
import { MongoHelper } from "./helper/mongo-helper";

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
    getAuthorById(id: any): Promise<AuthorResponseData> {
        throw new Error("Method not implemented.");
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