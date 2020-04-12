import BookstoreDAO from '../src/dao/bookstore';
import BookstoreCtrl from '../src/controllers/bookstore';

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

describe('bookstore ctrl', () => {
    beforeAll(async () => {
        await BookstoreDAO.injectDB(global.appClient);
    });

    test('should get bookstore from api', async () => {
        const res = mockResponse();
        await BookstoreCtrl.apiGetBookstores({}, res);
        const bookstores = res.json.mock.calls[0][0]['bookstores'];
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
        const req = mockRequest(params, null, null);
        await BookstoreCtrl.apiGetBookstoreById(req, res);
        const bookstore = res.json.mock.calls[0][0]['bookstore'];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(bookstore.id).toEqual(params.bookstoreId);
        expect(bookstore.name).toEqual('Urban Fantasy');
        expect(bookstore.length).toBe(undefined);
    });

    test('should add bookstore', async () => {
        const body = {
            id: '6bd895ce-af7a-451a-8b25-50c2876e162f',
            name: 'Bookstore for Test',
            picture: 'test_picture.png'
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const req = mockRequest(null, body, user);
        const res = mockResponse();
        await BookstoreCtrl.apiAddBookstore(req, res);
        const addedBookstore = res.json.mock.calls[0][0];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(addedBookstore.response).toEqual(`New bookstore ${body.name} is created`);
    });

    test('should update a bookstore', async () => {
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162f'
        };
        const body = {
            name: 'New Name',
            picture: 'new_picture.png'
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const req = mockRequest(params, body, user);
        const res = mockResponse();
        await BookstoreCtrl.apiUpdateBookstore(req, res);
        const numberOfUpdatedBookstores = res.json.mock.calls[0][0];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfUpdatedBookstores).toBe(`1 bookstores updated: ${'Bookstore for Test'} updated`);
    });

    test('should delete bookstore', async () => {
        const params = {
            bookstoreId: '6bd895ce-af7a-451a-8b25-50c2876e162f'
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const req = mockRequest(params, null, user);
        const res = mockResponse();
        await BookstoreCtrl.apiDeleteBookstore(req, res);
        const numberOfDeletedBookstores = res.json.mock.calls[0][0];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfDeletedBookstores).toBe(`1 bookstores deleted: ${'New Name'} deleted`);
    });
});
