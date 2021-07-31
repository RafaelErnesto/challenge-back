import { Book } from '../book'

describe('Book entity tests', () => {
    it('Ensure Book Entitiy returns an instance of Book when parameters are correct', () => {
        const book = Book.create({
            name: 'Test title',
            edition: 123,
            publication_year: 2021,
            authors: ['id_1', 'id_2'],
        })

        expect(book).toBeInstanceOf(Book)
    })

    it('Ensure Book Entity throws when name is empty', () => {
        expect(() => {
            Book.create({
                name: '',
                edition: 123,
                publication_year: 2021,
                authors: ['id_1', 'id_2'],
            })
        }).toThrow()
    })
})