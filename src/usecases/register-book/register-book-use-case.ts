import { BookData } from "../../entities/book";
import { BookResponseData } from "./book-response-data";

export interface RegisterBookUseCase {
    registerBook(data: BookData): Promise<BookResponseData>
}