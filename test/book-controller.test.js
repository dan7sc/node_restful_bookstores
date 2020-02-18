import BookDAO from '../src/dao/book';
import BookCtrl from '../src/controllers/book';

jest.mock('express');
const mockRequest = (bookstoreId, bookId) => {
    const req = {
        params: {
            bookstoreId: bookstoreId,
            bookId: bookId
        },
        body: {}
    };
    return req;
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue();
    return res;
};

describe('book ctrl', () => {
    beforeAll(async () => {
        await BookDAO.injectDB(global.appClient);
    });

    test('should get books from api', async () => {
        const res = mockResponse();
        const books = await BookCtrl.apiGetBooks({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(books[0].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(books[11].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6051');
    });

    test('should get books from a bookstore', async () => {
        const id = '6bd895ce-af7a-451a-8b25-50c2876e162a';
        const res = mockResponse();
        const req = mockRequest(id, null);
        const books = await BookCtrl.apiGetBooksByBookstoreId(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(books[0].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(books[0].bookstoreId).toEqual('6bd895ce-af7a-451a-8b25-50c2876e162a');
        expect(books[3].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6043');
        expect(books[3].bookstoreId).toEqual('6bd895ce-af7a-451a-8b25-50c2876e162a');
        expect(books.length).toBe(4);
    });

    test('should get a book from a bookstore', async () => {
        const bookstoreId = '6bd895ce-af7a-451a-8b25-50c2876e162a';
        const bookId = 'ba48ba34-6609-4468-aa5e-2b7b479d6040';
        const res = mockResponse();
        const req = mockRequest(bookstoreId, bookId);
        const book = await BookCtrl.apiGetBookByBookstoreId(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(book.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(book.bookstoreId).toEqual('6bd895ce-af7a-451a-8b25-50c2876e162a');
        expect(book.length).toBe(undefined);
    });

    test('should add book', async () => {
        const bookToAdd = {
            'id': 'ba48ba34-6609-4468-aa5e-2b7b479d6053',
            'title': 'The Name of the Rose',
            'author': 'Umberto Eco',
            'genre': 'Historical Mystery',
            'description': 'A novel.',
            'price': '22.29',
            'bookstoreId': '6bd895ce-af7a-451a-8b25-50c2876e162e'
        };
        const req = mockRequest(bookToAdd['bookstoreId'], bookToAdd['id']);
        req.body = bookToAdd;
        const res = mockResponse();
        const addedBook = await BookCtrl.apiAddBook(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(addedBook.id).toEqual(bookToAdd.id);
        expect(addedBook.title).toEqual(bookToAdd.title);
        expect(addedBook.bookstoreId).toEqual(bookToAdd.bookstoreId);
    });

    test('should update a book', async () => {
        const id = 'ba48ba34-6609-4468-aa5e-2b7b479d6053';
        const bookToUpdate = {
            'description': 'A italian novel.',
            'price': '32.29'
        };
        const req = mockRequest(null, id);
        req.body = bookToUpdate;
        const res = mockResponse();
        const numberOfUpdatedBooks = await BookCtrl.apiUpdateBook(req, res);
        const updatedBook = await BookDAO.getBookById(id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfUpdatedBooks.pop()).toBe(1);
        expect(updatedBook.id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6053');
        expect(updatedBook.title).toEqual('The Name of the Rose');
        expect(updatedBook.description).toEqual('A italian novel.');
        expect(updatedBook.price).toEqual(32.29);
    });

    test('should delete book', async () => {
        const id = 'ba48ba34-6609-4468-aa5e-2b7b479d6053';
        const req = mockRequest(null, id);
        const res = mockResponse();
        const numberOfDeletedBooks = await BookCtrl.apiDeleteBook(req, res);
        const book = await BookDAO.getBookById(id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfDeletedBooks).toBe(1);
        expect(book).toEqual(null);
    });
});
