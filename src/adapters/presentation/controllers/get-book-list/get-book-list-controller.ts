import { GetBookListUseCase } from "../../../../usecases/get-book-list/get-book-list-use-case";
import { ok } from "../helpers/http-helper";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";

export class GetBookListController implements BaseController {
    private getBookList: GetBookListUseCase

    constructor(getBookList: GetBookListUseCase) {
        this.getBookList = getBookList
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const books = await this.getBookList.getBooks()
        return new Promise(resolve => resolve(ok(books)))
    }
    
}