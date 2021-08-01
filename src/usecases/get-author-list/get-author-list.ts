import { AuthorRepositoryInterface, AuthorResponseData } from '../ports/author-repository';
import { GetAuthorListUseCase } from './get-author-list-use-case'

export class GetAuthorList implements GetAuthorListUseCase {

    private authorRepository: AuthorRepositoryInterface

    constructor(authorRepository: AuthorRepositoryInterface) {
        this.authorRepository = authorRepository
    }

    async getAuthorList(): Promise<AuthorResponseData[]> {
        const authors = await this.authorRepository.getAllAuthors()
        return new Promise(resolve => resolve(authors))
    }

}