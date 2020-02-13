import BookstoreDAO from '../src/dao/bookstore';

describe('Database', () => {
    beforeAll(async () => {
        await BookstoreDAO.injectDB(global.appClient);
    });

    test('should syncronize models', async () => {
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
