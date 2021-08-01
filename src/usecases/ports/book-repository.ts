import { BookData } from "../../entities/book";
import { BookResponseData } from "../register-book/book-response-data";

export interface AuthorResponseData {
    name: string
    id: string
}

export interface BookRepositoryInterface {
   addBook(data: BookData): Promise<BookResponseData>
   getBooks(filters?: any): Promise<BookResponseData[]>
   updateBook(data: BookData): Promise<BookResponseData>
   deleteBook(id: string): Promise<string>
}