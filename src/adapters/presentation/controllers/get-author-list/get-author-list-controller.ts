import { GetAuthorListUseCase } from "../../../../usecases/get-author-list/get-author-list-use-case";
import { ok } from "../helpers/http-helper";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";

export class GetAuthorListController implements BaseController {

    private getAuthorList: GetAuthorListUseCase

    constructor(getAuthorList: GetAuthorListUseCase) {
        this.getAuthorList = getAuthorList
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const result = await this.getAuthorList.getAuthorList()
        return new Promise(resolve => resolve(ok(result)))
    }
    
}