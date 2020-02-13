import BookstoreDAO from '../src/dao/bookstore';

describe('Connection to database', () => {
    beforeAll(async () => {
        await BookstoreDAO.injectDB(global.appClient);
    });

    test('Can access bookstore data', async () => {
        const modelNames = [];
        const models = global.appClient.models;
        for (const model in models) {
            await modelNames.push(model);
        }
        expect(modelNames).toContain('Customer');
        expect(modelNames).toContain('Bookstore');
        expect(modelNames).toContain('Book');
    });
});
