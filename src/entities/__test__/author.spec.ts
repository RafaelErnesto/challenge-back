import { Author } from '../author'
import { InvalidAuthorName } from '../errors/invalid-author-name'

describe('Author entity tests', () => {
    it('Ensure entity create returns Author instance', async () => {
       const author = Author.create({name: 'J.K.Rowling'})
       expect(author).toBeInstanceOf(Author)
    })
})