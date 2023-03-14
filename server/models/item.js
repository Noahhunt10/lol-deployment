const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Item: sequelize.define("item", {
    orderNumber: DataTypes.INTEGER,
    item_object: DataTypes.JSONB,
  }),
};
