import BookstoreDAO from '../src/dao/bookstore';
import BookstoreCtrl from '../src/controllers/bookstore';

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

describe('bookstore ctrl', () => {
    beforeAll(async () => {
        await BookstoreDAO.injectDB(global.appClient);
    });

    test('should get bookstore from api', async () => {
        const res = mockResponse();
        const bookstores = await BookstoreCtrl.apiGetBookstores({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(bookstores[0].id).toEqual('6bd895ce-af7a-451a-8b25-50c2876e162a');
        expect(bookstores[4].id).toEqual('6bd895ce-af7a-451a-8b25-50c2876e162e');
        expect(bookstores.length).toBe(5);
    });

    test('should get a bookstore', async () => {
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162a'
        };
        const res = mockResponse();
        const req = mockRequest(params, null);
        const bookstore = await BookstoreCtrl.apiGetBookstoreById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(bookstore.id).toEqual(params.bookstoreId);
        expect(bookstore.name).toEqual('Urban Fantasy');
        expect(bookstore.length).toBe(undefined);
    });

    test('should add bookstore', async () => {
        const body = {
            id: '6bd895ce-af7a-451a-8b25-50c2876e162f',
            name: 'Boosktore for Test',
            picture: 'test_picture.png',
            customerId: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65',
        };
        const req = mockRequest(null, body);
        const res = mockResponse();
        const addedBookstore = await BookstoreCtrl.apiAddBookstore(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(addedBookstore.id).toEqual(body.id);
        expect(addedBookstore.name).toEqual(body.name);
        expect(addedBookstore.picture).toEqual(body.picture);
        expect(addedBookstore.customerId).toEqual(body.customerId);
    });

    test('should update a bookstore', async () => {
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162f'
        };
        const body = {
            name: 'New Name',
            picture: 'new_picture.png'
        };
        const req = mockRequest(params, body);
        const res = mockResponse();
        const numberOfUpdatedBookstores = await BookstoreCtrl.apiUpdateBookstore(req, res);
        const updatedBookstore = await BookstoreDAO.getBookstoreById(params.bookstoreId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfUpdatedBookstores.pop()).toBe(1);
        expect(updatedBookstore.id).toEqual(params.bookstoreId);
        expect(updatedBookstore.name).toEqual(body.name);
        expect(updatedBookstore.picture).toEqual(body.picture);
    });

    test('should delete bookstore', async () => {
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162f'
        };
        const req = mockRequest(params, null);
        const res = mockResponse();
        const numberOfDeletedBookstores = await BookstoreCtrl.apiDeleteBookstore(req, res);
        const bookstore = await BookstoreDAO.getBookstoreById(params.bookstoreId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfDeletedBookstores).toBe(1);
        expect(bookstore).toEqual(null);
    });
});
