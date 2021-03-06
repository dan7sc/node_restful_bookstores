import BookstoreDAO from '../src/dao/bookstore';

describe('bookstore dao', () => {
    beforeAll(async () => {
        await BookstoreDAO.injectDB(global.appClient);
    });

    test('should get bookstores', async () => {
        const bookstores = await BookstoreDAO.getBookstores();
        const firstBookstore = bookstores[0];
        const secondBookstore = bookstores[1];
        const fiftyBookstore  = bookstores[4];
        expect(firstBookstore.name).toEqual('Urban Fantasy');
        expect(secondBookstore.name).toEqual('Dead Fish');
        expect(fiftyBookstore.name).toEqual('Updated!');
    });

    test('should get a bookstore', async () => {
        const bookstoreId = [
            "6bd895ce-af7a-451a-8b25-50c2876e162a",
            "6bd895ce-af7a-451a-8b25-50c2876e162e"
        ];
        const firstBookstore = await BookstoreDAO.getBookstoreById(bookstoreId[0]);
        const fiftyBookstore = await BookstoreDAO.getBookstoreById(bookstoreId[1]);
        expect(firstBookstore.name).toEqual('Urban Fantasy');
        expect(fiftyBookstore.name).toEqual('Updated!');
        expect(firstBookstore.length).toBe(undefined);
        expect(fiftyBookstore.length).toBe(undefined);
    });

    test('should add a bookstore', async () => {
        const bookstoreToAdd = {
            id: '6bd895ce-af7a-451a-8b25-50c2876e162f',
            name: 'myBookstore',
            picture: 'my_bookstore_image.png',
            customerId: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const [addedBookstore, isCreated] = await BookstoreDAO.addBookstore(bookstoreToAdd);
        expect(addedBookstore.name).toEqual(bookstoreToAdd.name);
        expect(addedBookstore.picture).toEqual(bookstoreToAdd.picture);
        expect(isCreated).toBeTruthy();
    });

    test('should update bookstore', async () => {
        const bookstoreId = '6bd895ce-af7a-451a-8b25-50c2876e162f';
        const dataToUpdate = {
            name: 'myUpdatedBookstore',
            picture: 'updated_image.png'
        };
        const numberOfUpdatedBookstores = await BookstoreDAO.updateBookstore(bookstoreId, dataToUpdate);
        const updatedBookstore = await BookstoreDAO.getBookstoreById(bookstoreId);
        expect(numberOfUpdatedBookstores.pop()).toBe(1);
        expect(updatedBookstore.id).toEqual(bookstoreId);
        expect(updatedBookstore.name).toEqual(dataToUpdate.name);
        expect(updatedBookstore.picture).toEqual(dataToUpdate.picture);
    });

    test('should delete bookstore', async () => {
        const bookstoreId = '6bd895ce-af7a-451a-8b25-50c2876e162f';
        const numberOfDeletedBookstores = await BookstoreDAO.deleteBookstore(bookstoreId);
        const bookstore = await BookstoreDAO.getBookstoreById(bookstoreId);
        expect(numberOfDeletedBookstores).toBe(1);
        expect(bookstore.error).not.toEqual(null);
    });
});
