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

    test('should get books from a bookstore', async () => {
        const bookId = '6bd895ce-af7a-451a-8b25-50c2876e162a';
        const books = await BookDAO.getBooksByBookstoreId(bookId);
        const firstBook = books[0];
        const lastBook = books[books.length-1];
        expect(firstBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(firstBook.title).toEqual('The Hobbit');
        expect(lastBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6043');
        expect(lastBook.title).toEqual('The Return of the King');
        expect(books.length).toBe(4);
    });

    test('should add a book', async () => {
        const bookToAdd = {
            id: 'ba48ba34-6609-4468-aa5e-2b7b479d6053',
            title: 'The Name of the Rose',
            author: 'Umberto Eco',
            genre: 'Historical Mystery',
            description: 'A novel.',
            price: '22.29',
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162e'
        };
        const addedBook = await BookDAO.addBook(bookToAdd);
        expect(addedBook.id).toEqual(bookToAdd.id);
        expect(addedBook.title).toEqual(bookToAdd.title);
        expect(addedBook.bookstoreId).toEqual(bookToAdd.bookstoreId);
    });

    test('should get a book', async () => {
        const bookId = [
            'ba48ba34-6609-4468-aa5e-2b7b479d6040',
            'ba48ba34-6609-4468-aa5e-2b7b479d6051'
        ];
        const firstBook = await BookDAO.getBookById(bookId[0]);
        const lastBook = await BookDAO.getBookById(bookId[1]);
        expect(firstBook.id).toEqual(bookId[0]);
        expect(firstBook.title).toEqual('The Hobbit');
        expect(lastBook.length).toBe(undefined);
        expect(lastBook.id).toEqual(bookId[1]);
        expect(lastBook.title).toEqual('Atonement');
        expect(lastBook.length).toBe(undefined);
    });

    test('should get a book from a bookstore', async () => {
        const bookId = [
            'ba48ba34-6609-4468-aa5e-2b7b479d6040',
            'ba48ba34-6609-4468-aa5e-2b7b479d6051'
        ];
        const bookstoreId = [
            '6bd895ce-af7a-451a-8b25-50c2876e162a',
            '6bd895ce-af7a-451a-8b25-50c2876e162e'
        ];
        const firstBook = await BookDAO.getBookByBookstoreId(bookstoreId[0], bookId[0]);
        const lastBook = await BookDAO.getBookByBookstoreId(bookstoreId[1], bookId[1]);
        expect(firstBook.id).toEqual(bookId[0]);
        expect(firstBook.title).toEqual('The Hobbit');
        expect(firstBook.bookstoreId).toEqual(bookstoreId[0]);
        expect(lastBook.length).toBe(undefined);
        expect(lastBook.id).toEqual(bookId[1]);
        expect(lastBook.title).toEqual('Atonement');
        expect(lastBook.bookstoreId).toEqual(bookstoreId[1]);
        expect(lastBook.length).toBe(undefined);
    });

    test('should update a book', async () => {
        const bookId = 'ba48ba34-6609-4468-aa5e-2b7b479d6053';
        const newData = {
            description: 'A italian novel.',
            price: 32.29
        };
        const numberOfUpdatedBooks = await BookDAO.updateBook(bookId, newData);
        const updatedBook = await BookDAO.getBookById(bookId);
        expect(numberOfUpdatedBooks.pop()).toBe(1);
        expect(updatedBook.id).toEqual(bookId);
        expect(updatedBook.title).toEqual('The Name of the Rose');
        expect(updatedBook.description).toEqual(newData.description);
        expect(updatedBook.price).toEqual(newData.price);
    });

    test('should delete book', async () => {
        const bookId = 'ba48ba34-6609-4468-aa5e-2b7b479d6053';
        const numberOfDeletedBooks = await BookDAO.deleteBook(bookId);
        const book = await BookDAO.getBookById(bookId);
        expect(numberOfDeletedBooks).toBe(1);
        expect(book).toEqual(null);
    });
});
