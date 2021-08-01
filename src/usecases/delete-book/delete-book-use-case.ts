export interface DeleteBookUseCase {
    deleteBook(id: string): Promise<string>
}