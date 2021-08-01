import { RegisterBookUseCase } from "../../../../usecases/register-book/register-book-use-case";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";
import { created } from '../helpers/http-helper'

export class RegisterBookController implements BaseController {
    private registerBook: RegisterBookUseCase

    constructor(registerBook: RegisterBookUseCase) {
        this.registerBook = registerBook
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const result = await this.registerBook.registerBook(httpRequest.body)
        return new Promise(resolve => resolve(created(result)))
    }
    
}