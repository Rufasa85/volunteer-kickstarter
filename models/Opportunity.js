const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Opportunity extends Model {}

Opportunity.init(
  {
    // add properites here, ex:
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lattitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    volunteersNeeded: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Opportunity;
