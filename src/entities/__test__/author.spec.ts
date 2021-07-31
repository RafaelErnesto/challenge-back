import { Author } from '../author'

describe('Author entity tests', () => {
    it('Ensure entity create returns Author instance', async () => {
       const author = Author.create({name: 'J.K.Rowling'})
       expect(author).toBeInstanceOf(Author)
    })

    it('Ensure entity create throws when name is empty', async () => {
        expect(() => {
            Author.create({name: ''})
        }).toThrow()
     })
})