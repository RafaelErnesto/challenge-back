import { GetAuthorListUseCase } from "../../../../usecases/get-author-list/get-author-list-use-case";
import { ok , badRequest} from "../helpers/http-helper";
import { BaseController } from "../http/base-controller";
import { HttpRequest } from "../http/http-request";
import { HttpResponse } from "../http/http-response";

export class GetAuthorListController implements BaseController {

    private getAuthorList: GetAuthorListUseCase

    constructor(getAuthorList: GetAuthorListUseCase) {
        this.getAuthorList = getAuthorList
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        let page = 0
        let filter = undefined
        if(httpRequest.query?.page) {
            page = Number.parseInt(httpRequest.query.page)
        }
        if(httpRequest.query?.name) {
            filter = httpRequest.query.name
        }
        if(filter && typeof filter !== 'string') {
            return badRequest('Filter must be string')
        }
        const result = await this.getAuthorList.getAuthorList(page, filter)
        return new Promise(resolve => resolve(ok(result)))
    }
    
}