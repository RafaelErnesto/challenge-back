import { UpdateBookUseCase } from "../../../../usecases/update-book/update-book-use-case";
import { ok } from "../helpers/http-helper";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";
import { MissingParameter } from '../http/errors/missing-parameter'
export class UpdateBookController implements BaseController {
    private updateBook: UpdateBookUseCase

    constructor(updateBook: UpdateBookUseCase) {
        this.updateBook = updateBook
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            this.validateRequest(httpRequest.body)

            const { name, edition, publication_year, authors, id} = httpRequest.body
            const updatedBook = await this.updateBook.updateBook({
                name,
                edition,
                publication_year,
                authors
            }, id)

            return new Promise(resolve => resolve(ok(updatedBook)))
        } catch(error) {
            return new Promise((resolve, reject) => reject(error))
        }
    }

    private validateRequest(data: any) {
        if(!data.name) {
            throw new MissingParameter('name')
        }
    }
    
}