import path from 'path';
import app from './server';
import Sequelize from 'sequelize';
import BookstoreDAO from './dao/bookstore';
import BookDAO from './dao/book';
import CustomerDAO from './dao/customer';
import { importModel, associateModels, readContentDirectory } from '../utils/utils';

const port = process.env.PORT || 5000;

const db = {};

// Setup a connection
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    },
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.models = {};

sequelize.authenticate()
    .then(async () => {
        const dir = path.join(__dirname, 'models');
        const contentDir = await readContentDirectory(dir);
        const models = await importModel(db.sequelize, contentDir, dir);
        db.models = models;
        await associateModels(db);
        await db.sequelize.sync();
        await CustomerDAO.injectDB(sequelize);
        await BookstoreDAO.injectDB(sequelize);
        await BookDAO.injectDB(sequelize);
        console.log('Connection to database has been established successfully');
        app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch(error => {
        console.log(`Unable to connect to the database: ${error}`);
        process.exit(1);
   });
