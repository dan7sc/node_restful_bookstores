import db from '../data/database-setup';

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
   });
