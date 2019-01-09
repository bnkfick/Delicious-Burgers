
module.exports = function (sequelize, DataType) {
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataType.STRING,
            allowNull: false,
            len: [1]
        }
    });
    Customer.associate = function (models) {
        Customer.hasMany(models.Burger, {
            onDelete: "CASCADE"
        });
    };

    return Customer;
};