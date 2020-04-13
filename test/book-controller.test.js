import BookstoreDAO from '../src/dao/bookstore';
import BookDAO from '../src/dao/book';
import BookCtrl from '../src/controllers/book';

jest.mock('express');
const mockRequest = (params, body, user) => {
    const req = {};
    req.params = params;
    req.body = body;
    req.user = user;
    return req;
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('book ctrl', () => {
    beforeAll(async () => {
        await BookDAO.injectDB(global.appClient);
        await BookstoreDAO.injectDB(global.appClient);
    });

    test('should get books from api', async () => {
        const res = mockResponse();
        await BookCtrl.apiGetBooks({}, res);
        const books = res.json.mock.calls[0][0];
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
        const req = mockRequest(params, null, null);
        await BookCtrl.apiGetBooksByBookstoreId(req, res);
        const books = res.json.mock.calls[0][0];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(books[0].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6040');
        expect(books[0].bookstoreId).toEqual(params.bookstoreId);
        expect(books[3].id).toEqual('ba48ba34-6609-4468-aa5e-2b7b479d6043');
        expect(books[3].bookstoreId).toEqual(params.bookstoreId);
        expect(books.length).toBe(4);
    });

    test('should get a book', async () => {
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162a',
            bookId: 'ba48ba34-6609-4468-aa5e-2b7b479d6040'
        };
        const res = mockResponse();
        const req = mockRequest(params, null, null);
        await BookCtrl.apiGetBookById(req, res);
        const book = res.json.mock.calls[0][0];
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
            price: 22.29
        };
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162e'
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const req = mockRequest(params, body, user);
        const res = mockResponse();
        await BookCtrl.apiAddBook(req, res);
        const newBook = res.json.mock.calls[0][0]['response'];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(newBook).toEqual(`Book ${body.title} is added`);
    });

    test('should update a book', async () => {
        const params = {
            bookId: 'ba48ba34-6609-4468-aa5e-2b7b479d6053'
        };
        const body = {
            description: 'A italian novel.',
            price: 32.29
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const req = mockRequest(params, body, user);
        const res = mockResponse();
        await BookCtrl.apiUpdateBook(req, res);
        const numberOfUpdatedBooks = res.json.mock.calls[0][0]['response'];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfUpdatedBooks).toBe('1 books updated');
    });

    test('should delete book', async () => {
        const params = {
            bookId: 'ba48ba34-6609-4468-aa5e-2b7b479d6053'
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const req = mockRequest(params, null, user);
        const res = mockResponse();
        await BookCtrl.apiDeleteBook(req, res);
        const numberOfDeletedBooks = res.json.mock.calls[0][0]['response'];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfDeletedBooks).toBe('1 books deleted');
    });
});
