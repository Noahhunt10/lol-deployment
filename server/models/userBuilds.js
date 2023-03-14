const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Build: sequelize.define("build", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    buildName: DataTypes.STRING,
    champion: DataTypes.STRING,
  }),
};
