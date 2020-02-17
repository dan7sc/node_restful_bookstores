import BookDAO from '../src/dao/book';

describe('book dao', () => {
    beforeAll(async () => {
        await BookDAO.injectDB(global.appClient);
    });

    test('should get books', async () => {
        const books = await BookDAO.getBooks();
        const firstBook = books[0];
        const lastBook = books[books.length-1];
        expect(firstBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(firstBook.title).toEqual('The Hobbit');
        expect(lastBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6051');
        expect(lastBook.title).toEqual('Atonement');
        expect(books.length).toBe(12);
    });

    test('should add a book', async () => {
        const bookToAdd = {
            "id": "ba48ba34-6609-4468-aa5e-2b7b479d6053",
            "title": "The Name of the Rose",
            "author": "Umberto Eco",
            "genre": "Historical Mystery",
            "description": "A novel.",
            "price": "22.29",
            "bookstoreId": "6bd895ce-af7a-451a-8b25-50c2876e162e"
        };
        const addedBook = await BookDAO.addBook(bookToAdd);
        expect(addedBook.id).toEqual(bookToAdd.id);
        expect(addedBook.title).toEqual(bookToAdd.title);
        expect(addedBook.bookstoreId).toEqual(bookToAdd.bookstoreId);
    });
});
