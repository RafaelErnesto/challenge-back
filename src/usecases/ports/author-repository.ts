import { AuthorData } from "../../entities/author";

export interface AuthorResponseData {
    name: string
    id: string
}

export interface AuthorRepositoryInterface {
    getAllAuthors(): Promise<AuthorResponseData[]>
    getAuthorByName(name: string): Promise<AuthorResponseData>
    getAuthorById(id: any): Promise<AuthorResponseData>
    addAuthor(data: AuthorData) : Promise<AuthorResponseData>
}