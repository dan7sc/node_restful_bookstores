import Sequelize from 'sequelize';

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
        }
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
