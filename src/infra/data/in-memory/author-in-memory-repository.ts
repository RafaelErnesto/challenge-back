import { AuthorData } from "../../../entities/author";
import { AuthorRepositoryInterface, AuthorResponseData } from "../../../usecases/ports/author-repository";
import  authorsData from './authors.json'
export class AuthorInMemoryRepository implements AuthorRepositoryInterface {
    private authors:any;

    constructor() {
        this.authors = authorsData
    }
    getAuthorById(id: any): Promise<AuthorResponseData> {
        
       const author =  this.authors.find((author: any) => {
           return author.id === id
       })
       const response = author ?? null
       return new Promise(resolve => resolve(response))
    }

    getAllAuthors(): Promise<AuthorResponseData[]> {
        return new Promise((resolve,reject) => {
            resolve(this.authors)
        })
    }
    getAuthorByName(name: string): Promise<AuthorResponseData> {
        throw new Error("Method not implemented.");
    }
    addAuthor(data: AuthorData): Promise<AuthorResponseData> {
        throw new Error("Method not implemented.");
    }

}