import BookDAO from '../src/dao/book';
import BookCtrl from '../src/controllers/book';

jest.mock('express');
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
});
