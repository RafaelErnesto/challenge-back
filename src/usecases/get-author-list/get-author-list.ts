import { AuthorRepositoryInterface, AuthorResponseData } from '../ports/author-repository';
import { GetAuthorListUseCase } from './get-author-list-use-case'

export class GetAuthorList implements GetAuthorListUseCase {

    private authorRepository: AuthorRepositoryInterface

    constructor(authorRepository: AuthorRepositoryInterface) {
        this.authorRepository = authorRepository
    }

    async getAuthorList(page: number = 1, filter?:string): Promise<AuthorResponseData[]> {
        console.log(page)
        const authors = await this.authorRepository.getAllAuthors(page,filter)
        return new Promise(resolve => resolve(authors))
    }

}