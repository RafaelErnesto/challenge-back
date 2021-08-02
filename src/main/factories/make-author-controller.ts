import { GetAuthorListController } from "../../adapters/presentation/controllers/get-author-list/get-author-list-controller";
import { AuthorsMongodbRepository } from "../../infra/data/mongodb/authors-mongodb-repository";
import { GetAuthorList } from "../../usecases/get-author-list/get-author-list";

export const makeAuthorController = (): GetAuthorListController => {
    const authorRepo = new AuthorsMongodbRepository()
    const authorList = new GetAuthorList(authorRepo)
    const getAuthorListController = new GetAuthorListController(authorList)
    return getAuthorListController
}