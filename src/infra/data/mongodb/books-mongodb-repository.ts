import { BookData } from "../../../entities/book";
import { BookOptions } from "../../../usecases/get-book-list/get-book-list-use-case";
import { BookRepositoryInterface } from "../../../usecases/ports/book-repository";
import { BookResponseData } from "../../../usecases/register-book/book-response-data";
import { MongoHelper } from "./helper/mongo-helper";
import { ObjectId } from 'mongodb'
export class BooksMongodbRepository implements BookRepositoryInterface {
    async addBook(data: BookData): Promise<BookResponseData> {
        const result = await MongoHelper.getCollection('books').insertOne(data)
        const insertedBook = await MongoHelper.getCollection('books').find({_id: result.insertedId }).toArray()
        const { name, edition, publication_year, authors, _id } = insertedBook[0]
         return new Promise(resolve => resolve({
            name,
            edition,
            publication_year,
            authors,
            id: _id.toHexString(),
        }))
    }
    async getBooks(filters?: BookOptions): Promise<BookResponseData[]> {
        return await MongoHelper.getCollection('books').find({}).toArray();
    }
    async updateBook(data: BookData, id: string): Promise<BookResponseData> {
        const updatedBook = await MongoHelper.getCollection('books').updateOne({_id: new ObjectId(id) },{
            $set: {
                name: data.name,
                edition: data.edition,
                publication_year: data.publication_year,
                authors: data.authors
            }
        })

        return new Promise(resolve => resolve({ 
                name: data.name,
                edition: data.edition,
                publication_year: data.publication_year,
                authors: data.authors,
                id
        }))
    }
    async deleteBook(id: string): Promise<string> {
        await MongoHelper.getCollection('books').deleteOne({_id: new ObjectId(id)})
        return new Promise(resolve =>  resolve('Deleted'))
    }
    
}