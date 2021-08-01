import { BookResponseData } from "../register-book/book-response-data";

export interface BookOptions {
    name?: string
    publication_year?: number
    edition?: number
    authors?:string[]
}
export interface GetBookListUseCase {
    getBooks(filters?: BookOptions): Promise<BookResponseData[]>
}