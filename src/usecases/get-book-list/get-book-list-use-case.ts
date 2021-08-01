import { BookResponseData } from "../register-book/book-response-data";

export interface GetBookListUseCase {
    getBooks(filters?: any[]): Promise<BookResponseData[]>
}