import BookstoreDAO from '../src/dao/bookstore';

describe('GET method', () => {
    beforeAll(async () => {
        await BookstoreDAO.injectDB(global.appClient);
    });

    test('should get bookstores', async () => {
        const bookstores = await BookstoreDAO.getBookstores();
        const firstBookstore = bookstores[0];
        const lastBookstore  = bookstores[bookstores.length-1];
        expect(firstBookstore.name).toEqual('Urban Fantasy');
        expect(lastBookstore.name).toEqual('Updated!');
        expect(bookstores.length).toBe(5);
    });
});
