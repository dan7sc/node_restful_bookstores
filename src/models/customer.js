export default (sequelize, DataType) => {
    const Customer = sequelize.define('Customer', {
        id: {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataType.STRING(100),
            field: 'first_name',
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataType.STRING(100),
            field: 'last_name',
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        picture: {
            type: DataType.STRING(250),
            allowNull: true
        },
        createdAt: {
            type: DataType.DATE,
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            field: 'updated_at'
        }
    }, {
        tableName: 'customer',
        underscored: true,
        freezeTableName: true,
    });

    Customer.associate = (models) => {
        Customer.hasMany(models.Bookstore, {
            foreignKey: 'customerId',
            onDelete: 'cascade'
        });
    };

    return Customer;
}
