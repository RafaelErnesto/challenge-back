import { AuthorRepositoryInterface } from "../ports/author-repository"

export async function validateAuthorsExists(authors: string[], authorRepository: AuthorRepositoryInterface): Promise<boolean>{
    const result = await Promise.allSettled(authors.map((author) => {
        return authorRepository.getAuthorById(author)
    }))

    const foundAuthors = result
        .filter(data =>  data.status === 'fulfilled')
        .filter(data =>  {
            if(data.status === 'fulfilled') {
                return data.value !== null
            }
        })

    const comparison =  foundAuthors.length === authors.length
    
    return new Promise(resolve => resolve(comparison))
}
