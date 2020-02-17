import BookDAO from '../src/dao/book';

describe('book dao', () => {
    beforeAll(async () => {
        await BookDAO.injectDB(global.appClient);
    });

    test('get books', async () => {
        const books = await BookDAO.getBooks();
        const firstBook = books[0];
        const lastBook = books[books.length-1];
        expect(firstBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(firstBook.title).toEqual('The Hobbit');
        expect(lastBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6051');
        expect(lastBook.title).toEqual('Atonement');
        expect(books.length).toBe(12);
    });
});
