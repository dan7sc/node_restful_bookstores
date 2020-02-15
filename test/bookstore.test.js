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

    test('should get a bookstore', async () => {
        const ids = [
            "6bd895ce-af7a-451a-8b25-50c2876e162a",
            "6bd895ce-af7a-451a-8b25-50c2876e162e"
        ];
        const firstBookstore = await BookstoreDAO.getBookstoreById(ids[0]);
        const lastBookstore = await BookstoreDAO.getBookstoreById(ids[1]);
        expect(firstBookstore.name).toEqual('Urban Fantasy');
        expect(lastBookstore.name).toEqual('Updated!');
        expect(firstBookstore.length).toBe(undefined);
    });
});
