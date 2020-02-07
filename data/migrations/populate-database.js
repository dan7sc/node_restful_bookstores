import Customer from '../../src/models/customer';
import Bookstore from '../../src/models/bookstore';
import Book from '../../src/models/book';
import fs from 'fs';
import path from 'path';

function readContentFile(file, directory) {
    return new Promise(function(resolve, reject) {
        fs.readFile(directory + file,
                'utf-8',
                (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
    });
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function createTable(model) {
    const table = model.getTableName();
    try {
        await model.sync();
        console.log(`Table ${table} created`);
    }
    catch(error) {
        console.log('Error in creating tables');
    }
}

async function getTableDataFromFile(table, file, dir) {
    try {
        const dataStr = await readContentFile(file, dir);
        const dataObj = JSON.parse(dataStr);
        const data = dataObj[table];
        console.log(`Got data from table ${table}`);
        return data;
    }
    catch(error) {
        console.log('Error in get table data from file', error);
    }
}

async function saveDataInDatabase(data, model) {
    const table = model.getTableName();
    await model.create(data)
        .then(() => console.log(`Item with id ${data['id']} created in table ${table}`))
        .catch(error => console.log('Error in saving data',error));
}

const populateDatabase = function() {
    const dir = path.dirname(__dirname) + '/fake/';
    const models = [Customer, Bookstore, Book];

    asyncForEach(models, async (model) => {
        try {
            await createTable(model);
            const table = model.getTableName();
            const file = table + '.json';
            const data = await getTableDataFromFile(table, file, dir);
            await asyncForEach(data, async (item) => {
                await saveDataInDatabase(item, model);
            });
        } catch(error) {
            console.log('Error in populating table:', error);
        }
    });
};

export default populateDatabase;
