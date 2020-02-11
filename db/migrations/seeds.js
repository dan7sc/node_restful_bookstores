import path from 'path';
import { readContentDirectory,
         importModel,
         associateModels,
         sortModels,
         asyncForEach,
         getDataFromFile,
         saveData
       } from '../../utils/utils';

const db = {};

export default class Database {
    static async injectDB(conn) {
        try {
            db.conn = await conn;
            console.log('Connection to database was injected');
        }
        catch (error) {
            console.error(`Unable to establish a connection: ${error}`);
        }
    }

    static async seedDB() {
        try {
            const dataDir = path.join(__dirname, '..', 'data');
            const modelsDir = path.join(__dirname, '../../src', 'models');
            const contentModelDir = await readContentDirectory(modelsDir);
            const models = await importModel(db.conn, contentModelDir, modelsDir);
            await associateModels(models);
            const sortedModels = await sortModels(models);
            await db.conn.sync({ force: true });

            await asyncForEach(sortedModels, async (model) => {
                const table = await model.getTableName();
                const file = table + '.json';
                const data = await getDataFromFile(table, file, dataDir);
                await asyncForEach(data, async (item) => {
                    await saveData(item, model);
                });
            });
        } catch(error) {
            console.log('\x1b[31m%s\x1b[0m', `Error in populating database: ${error}`);
        }
        console.log('Database created and populated');
    }
}
