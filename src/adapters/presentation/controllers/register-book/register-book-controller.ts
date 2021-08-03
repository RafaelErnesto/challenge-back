import { RegisterBookUseCase } from "../../../../usecases/register-book/register-book-use-case";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";
import { created, badRequest } from '../helpers/http-helper'
import { MissingParameter } from "../http/errors/missing-parameter";

export class RegisterBookController implements BaseController {
    private registerBook: RegisterBookUseCase

    constructor(registerBook: RegisterBookUseCase) {
        this.registerBook = registerBook
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            this.validate(httpRequest.body)
            const result = await this.registerBook.registerBook(httpRequest.body)
            return new Promise(resolve => resolve(created(result)))
        } catch(error) {
            return new Promise((resolve, reject) => reject(badRequest(error)))
        }
    }

    private validate(data:any) {
        if(!data.name) {
            throw new MissingParameter('name')
        }

        if(!data.publication_year) {
            throw new MissingParameter('publication_year')
        }

        if(!data.edition) {
            throw new MissingParameter('edition')
        }

        if(!data.authors) {
            throw new MissingParameter('authors')
        }
    }
    
}