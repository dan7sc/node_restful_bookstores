import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const STRING = db.Sequelize.STRING;

const Customer = sequelize.define('customer', {
    id: {
        type: INTEGER,
        primaryKey: true
    },
    firstName: {
        type: STRING(100),
        allowNull: false
    },
    lastName: {
        type: STRING(100),
        allowNull: false
    },
    email: {
        type: STRING(150),
        allowNull: false
    },
    picture: {
        type: STRING(250),
        allowNull: true
    }
});

Customer.associate = (models) => {
    Customer.hasMany(models.Bookstore, {
        onDelete: 'cascade',
        hooks: true
    });
};

export default Customer;
