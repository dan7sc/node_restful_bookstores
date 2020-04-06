export default (sequelize, DataType) => {
    const Bookstore = sequelize.define('Bookstore', {
        id: {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataType.STRING(150),
            allowNull: false
        },
        picture: {
            type: DataType.STRING(250),
            allowNull: true
        },
        customerId: {
            type: DataType.UUID,
            allowNull: false,
            references:{
                model: 'customer',
                key: 'id'
            }
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
        tableName: 'bookstore',
        underscored: true,
        freezeTableName: true,
    });

    Bookstore.associate = (models) => {
        Bookstore.hasMany(models.Book, {
            foreignKey: 'bookstoreId',
            onDelete: 'cascade'
        });
    };

    return Bookstore;
};
