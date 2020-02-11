import fs from 'fs';
import path from 'path';

export function readContentFile(file, directory) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(directory, file),
                'utf-8',
                (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
    });
}

export function readContentDirectory(directory) {
    return new Promise(function(resolve, reject) {
        fs.readdir(directory,
                'utf-8',
                (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
    });
}

export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export function importModel(connection, contentDir, dir) {
    const models = [];
    contentDir.forEach((file) => {
        const modelDir = path.join(dir, file);
        try {
            const model = connection.import(modelDir);
            models[model.name] = model;
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', `Error in import model: ${error}`);
        }
    });
    return models;
}

export function associateModels(models) {
    for (const model in models) {
        const hasOwnProperty = models[model].hasOwnProperty('associate');
        if(hasOwnProperty) {
            try {
                models[model].associate(models);
            } catch (error) {
                console.log('\x1b[31m%s\x1b[0m', `Error in associate model: ${error}`);
            }
        }
    }
}

export async function sortModels(models) {
    const sortedModels = [];
    for (const model in models) {
        await sortedModels.push(models[model]);
    }
    const temp = sortedModels[2];
    sortedModels[2] = sortedModels[0];
    sortedModels[0] = temp;
    return sortedModels;
}

export async function getDataFromFile(model, file, dir) {
    let data;
    try {
        const dataStr = await readContentFile(file, dir);
        const dataObj = JSON.parse(dataStr);
        data = dataObj[model];
        console.log('\x1b[34m%s\x1b[0m', `Got data from file ${file}`);
    }
    catch(error) {
        console.log('\x1b[31m%s\x1b[0m', `Error in get data from file ${error}`);
    }
    return data;
}

export async function saveData(data, model) {
    const table = model.getTableName();
    try {
        await model.create(data);
        console.log('\x1b[32m%s\x1b[0m', `Item with id ${data['id']} created in table ${table}`);
    } catch(error) {
        console.log('\x1b[31m%s\x1b[0m', `Error in saving data ${error}`);
    }
}
