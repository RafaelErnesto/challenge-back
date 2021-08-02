import { BookData } from "../../../entities/book";
import { BookOptions } from "../../../usecases/get-book-list/get-book-list-use-case";
import { BookRepositoryInterface } from "../../../usecases/ports/book-repository";
import { BookResponseData } from "../../../usecases/register-book/book-response-data";
import { MongoHelper } from "./helper/mongo-helper";

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
    getBooks(filters?: BookOptions): Promise<BookResponseData[]> {
        throw new Error("Method not implemented.");
    }
    updateBook(data: BookData, id: string): Promise<BookResponseData> {
        throw new Error("Method not implemented.");
    }
    deleteBook(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}