import { BookData } from "../../entities/book";
import { BookResponseData } from "../register-book/book-response-data";

export interface UpdateBookUseCase {
    updateBook(data: BookData, id: string): Promise<BookResponseData>
}