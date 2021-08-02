import { NegativeEditionNumber } from "../../../../entities/errors/negative-edition-number";
import { BookOptions, GetBookListUseCase } from "../../../../usecases/get-book-list/get-book-list-use-case";
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
        let filters:BookOptions = {};

        if(httpRequest.query?.edition) {
            filters.edition = Number.parseInt(httpRequest.query?.edition)
        }  
        if(httpRequest.query?.name) {
            filters.name = httpRequest.query?.name
        }    
        if(httpRequest.query?.publication_year) {
            filters.publication_year = Number.parseInt(httpRequest.query?.publication_year)
        } 
        if(httpRequest.query?.authors) {
            filters.authors = httpRequest.query?.authors
        }  
        const books = await this.getBookList.getBooks(filters)
        return new Promise(resolve => resolve(ok(books)))
    }
    
}