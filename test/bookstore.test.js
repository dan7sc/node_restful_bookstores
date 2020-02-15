import BookstoreDAO from '../src/dao/bookstore';
describe('bookstore routes', () => {
    beforeAll(async () => {
        await BookstoreDAO.injectDB(global.appClient);
    });

    describe('GET method', () => {
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
            expect(lastBookstore.length).toBe(undefined);
        });
    });

    describe('POST method', () => {
        test('should add a bookstore', async () => {
            const bookstoreToAdd = {
                id: '6bd895ce-af7a-451a-8b25-50c2876e162f',
                name: 'myBookstore',
                picture: 'my_bookstore_image.png',
                customerId: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
            };
            const addedBookstore = await BookstoreDAO.addBookstore(bookstoreToAdd);
            expect(addedBookstore.name).toEqual(bookstoreToAdd.name);
            expect(addedBookstore.picture).toEqual(bookstoreToAdd.picture);
        });
    });

    describe('PUT method', () => {
        test('should update bookstore', async () => {
            const id = '6bd895ce-af7a-451a-8b25-50c2876e162f';
            const dataToUpdate = {
                name: 'myUpdatedBookstore',
                picture: 'updated_image.png'
            };
            const numberOfUpdatedBookstores = await BookstoreDAO.updateBookstore(id, dataToUpdate);
            const updatedBookstore = await BookstoreDAO.getBookstoreById(id);
            expect(numberOfUpdatedBookstores.pop()).toBe(1);
            expect(updatedBookstore.id).toEqual(id);
            expect(updatedBookstore.name).toEqual(dataToUpdate.name);
            expect(updatedBookstore.picture).toEqual(dataToUpdate.picture);
        });
    });

    describe('DELETE method', () => {
        test('should delete bookstore', async () => {
            const id = '6bd895ce-af7a-451a-8b25-50c2876e162f';
            const numberOfDeletedBookstores = await BookstoreDAO.deleteBookstore(id);
            const bookstore = await BookstoreDAO.getBookstoreById(id);
            expect(numberOfDeletedBookstores).toBe(1);
            expect(bookstore).toEqual(null);
        });
    });
});
