
module.exports = function (sequelize, DataType) {
    var Customer = sequelize.define("Customer", {
        name: {
            type: DataType.STRING,
            allowNull: false,
            len: [1]
        }
    });

    return Customer;
};