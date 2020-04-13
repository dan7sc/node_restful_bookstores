import BookDAO from '../src/dao/book';

describe('book dao', () => {
    beforeAll(async () => {
        await BookDAO.injectDB(global.appClient);
    });

    test('should get books', async () => {
        const books = await BookDAO.getBooks();
        const firstBook = books[0];
        const twelfthBook = books[11];
        expect(firstBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(firstBook.title).toEqual('The Hobbit');
        expect(twelfthBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6051');
        expect(twelfthBook.title).toEqual('Atonement');
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
            price: 22.29,
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162e'
        };
        const [newBook, isCreated] = await BookDAO.addBook(bookToAdd);
        expect(newBook.title).toEqual(bookToAdd.title);
        expect(newBook.author).toEqual(bookToAdd.author);
        expect(newBook.genre).toEqual(bookToAdd.genre);
        expect(newBook.description).toEqual(bookToAdd.description);
        expect(newBook.price).toEqual(bookToAdd.price);
        expect(newBook.bookstoreId).toEqual(bookToAdd.bookstoreId);
        expect(isCreated).toBeTruthy();
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
        expect(numberOfDeletedBooks).toBe(1);
    });
});
