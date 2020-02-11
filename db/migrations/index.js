import Sequelize from 'sequelize';
import Database from './seeds';

// Setup a connection
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
    }
);

sequelize.authenticate()
    .then(async () => {
            await Database.injectDB(sequelize).then(async () => {
                await Database.seedDB();
            });
            console.log('Connection to database has been established successfully');
    })
    .catch(error => {
        console.log(`Unable to connect to the database: ${error}`);
        process.exit(1);
    });
