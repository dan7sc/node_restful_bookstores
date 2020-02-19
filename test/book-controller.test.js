import BookDAO from '../src/dao/book';
import BookCtrl from '../src/controllers/book';

jest.mock('express');
const mockRequest = (params, body) => {
    const req = {};
    req.params = params;
    req.body = body;
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
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162a'
        };
        const res = mockResponse();
        const req = mockRequest(params, null);
        const books = await BookCtrl.apiGetBooksByBookstoreId(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(books[0].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(books[0].bookstoreId).toEqual(params.bookstoreId);
        expect(books[3].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6043');
        expect(books[3].bookstoreId).toEqual(params.bookstoreId);
        expect(books.length).toBe(4);
    });

    test('should get a book from a bookstore', async () => {
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162a',
            bookId: 'ba48ba34-6609-4468-aa5e-2b7b479d6040'
        };
        const res = mockResponse();
        const req = mockRequest(params, null);
        const book = await BookCtrl.apiGetBookByBookstoreId(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(book.id).toEqual(params.bookId);
        expect(book.bookstoreId).toEqual(params.bookstoreId);
        expect(book.length).toBe(undefined);
    });

    test('should add book', async () => {
        const body = {
            id: 'ba48ba34-6609-4468-aa5e-2b7b479d6053',
            title: 'The Name of the Rose',
            author: 'Umberto Eco',
            genre: 'Historical Mystery',
            description: 'A novel.',
            price: '22.29',
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162e'
        };
        const req = mockRequest(null, body);
        const res = mockResponse();
        const addedBook = await BookCtrl.apiAddBook(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(addedBook.id).toEqual(body.id);
        expect(addedBook.title).toEqual(body.title);
        expect(addedBook.bookstoreId).toEqual(body.bookstoreId);
    });

    test('should update a book', async () => {
        const params = {
            bookId: 'ba48ba34-6609-4468-aa5e-2b7b479d6053'
        };
        const body = {
            description: 'A italian novel.',
            price: 32.29
        };
        const req = mockRequest(params, body);
        const res = mockResponse();
        const numberOfUpdatedBooks = await BookCtrl.apiUpdateBook(req, res);
        const updatedBook = await BookDAO.getBookById(params.bookId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfUpdatedBooks.pop()).toBe(1);
        expect(updatedBook.id).toEqual(params.bookId);
        expect(updatedBook.title).toEqual('The Name of the Rose');
        expect(updatedBook.description).toEqual(body.description);
        expect(updatedBook.price).toEqual(body.price);
    });

    test('should delete book', async () => {
        const id = 'ba48ba34-6609-4468-aa5e-2b7b479d6053';
        const params = {
            bookId: 'ba48ba34-6609-4468-aa5e-2b7b479d6053'
        };
        const req = mockRequest(params, null);
        const res = mockResponse();
        const numberOfDeletedBooks = await BookCtrl.apiDeleteBook(req, res);
        const book = await BookDAO.getBookById(id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfDeletedBooks).toBe(1);
        expect(book).toEqual(null);
    });
});
