import { DeleteBookUseCase } from "../../../../usecases/delete-book/delete-book-use-case";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";
import { deletedWithNoDescription, badRequest } from '../helpers/http-helper'
import { MissingParameter } from "../http/errors/missing-parameter";
export class DeleteBookController implements BaseController {
    private bookRepository: DeleteBookUseCase

    constructor(bookRepo: DeleteBookUseCase) {
        this.bookRepository = bookRepo
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            if(httpRequest.body === undefined) {
                throw new MissingParameter('id')
            }
            const result = await this.bookRepository.deleteBook(httpRequest.body)
            return new Promise(resolve => resolve(deletedWithNoDescription()))
        } catch(error) {
            return new Promise((resolve, reject) => reject(badRequest(error)))
        }
    
    }
    
}