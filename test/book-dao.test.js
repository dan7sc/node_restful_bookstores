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
            'id': 'ba48ba34-6609-4468-aa5e-2b7b479d6053',
            'title': 'The Name of the Rose',
            'author': 'Umberto Eco',
            'genre': 'Historical Mystery',
            'description': 'A novel.',
            'price': '22.29',
            'bookstoreId': '6bd895ce-af7a-451a-8b25-50c2876e162e'
        };
        const addedBook = await BookDAO.addBook(bookToAdd);
        expect(addedBook.id).toEqual(bookToAdd.id);
        expect(addedBook.title).toEqual(bookToAdd.title);
        expect(addedBook.bookstoreId).toEqual(bookToAdd.bookstoreId);
    });

    test('should get a book', async () => {
        const id = [
            'ba48ba34-6609-4468-aa5e-2b7b479d6040',
            'ba48ba34-6609-4468-aa5e-2b7b479d6051'
        ];
        const firstBook = await BookDAO.getBookById(id[0]);
        const lastBook = await BookDAO.getBookById(id[1]);
        expect(firstBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(firstBook.title).toEqual('The Hobbit');
        expect(lastBook.length).toBe(undefined);
        expect(lastBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6051');
        expect(lastBook.title).toEqual('Atonement');
        expect(lastBook.length).toBe(undefined);
    });

    test('should update a book', async () => {
        const id = 'ba48ba34-6609-4468-aa5e-2b7b479d6053';
        const bookToUpdate = {
            'description': 'A italian novel.',
            'price': '32.29'
        };
        const numberOfUpdatedBooks = await BookDAO.updateBook(id, bookToUpdate);
        const updatedBook = await BookDAO.getBookById(id);
        expect(numberOfUpdatedBooks.pop()).toBe(1);
        expect(updatedBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6053');
        expect(updatedBook.title).toEqual('The Name of the Rose');
        expect(updatedBook.description).toEqual('A italian novel.');
        expect(updatedBook.price).toEqual(32.29);
    });

    test('should delete book', async () => {
        const id = 'ba48ba34-6609-4468-aa5e-2b7b479d6053';
        const numberOfDeletedBooks = await BookDAO.deleteBook(id);
        const book = await BookDAO.getBookById(id);
        expect(numberOfDeletedBooks).toBe(1);
        expect(book).toEqual(null);
    });
});
