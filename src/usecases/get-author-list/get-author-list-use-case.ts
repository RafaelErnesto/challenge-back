import { AuthorResponseData } from "../ports/author-repository";

export interface GetAuthorListUseCase {
    getAuthorList(page?: number, filter?: string): Promise<AuthorResponseData[]>
}