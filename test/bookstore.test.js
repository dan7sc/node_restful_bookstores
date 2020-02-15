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

    test('should add a bookstore', async () => {
        const bookstoreToAdd = {
            id: '6bd895ce-af7a-451a-8b25-50c2876e162f',
            name: 'myBookstore',
            picture: 'my_bookstore_image.png',
            customerId: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const addedBookstore = await BookstoreDAO.addBookstore(bookstoreToAdd);
        const response = await BookstoreDAO.getBookstoreById(addedBookstore.id);
        expect(addedBookstore.name).toEqual(response.name);
        expect(addedBookstore.picture).toEqual(response.picture);
    });
});
