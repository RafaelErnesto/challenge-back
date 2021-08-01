import { AuthorResponseData } from "../ports/author-repository";

export interface GetAuthorListUseCase {
    getAuthorList(): Promise<AuthorResponseData[]>
}