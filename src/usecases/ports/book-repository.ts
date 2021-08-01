import { BookData } from "../../entities/book";
import { BookOptions } from "../get-book-list/get-book-list-use-case";
import { BookResponseData } from "../register-book/book-response-data";

export interface AuthorResponseData {
    name: string
    id: string
}

export interface BookRepositoryInterface {
   addBook(data: BookData): Promise<BookResponseData>
   getBooks(filters?: BookOptions): Promise<BookResponseData[]>
   updateBook(data: BookData, id: string): Promise<BookResponseData>
   deleteBook(id: string): Promise<string>
}