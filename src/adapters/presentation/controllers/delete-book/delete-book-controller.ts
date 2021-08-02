import { DeleteBookUseCase } from "../../../../usecases/delete-book/delete-book-use-case";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";
import { deletedWithNoDescription } from '../helpers/http-helper'
export class DeleteBookController implements BaseController {
    private bookRepository: DeleteBookUseCase

    constructor(bookRepo: DeleteBookUseCase) {
        this.bookRepository = bookRepo
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const result = await this.bookRepository.deleteBook(httpRequest.body)
        return new Promise(resolve => resolve(deletedWithNoDescription()))
    }
    
}