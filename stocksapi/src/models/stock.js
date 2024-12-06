import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsToMany(models.Watchlist, {
        through: "watchlist_stocks",
        foreignKey: "stock_id",
        timestamps: false,
      });
    }
  }

  Stock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: DataTypes.STRING(255),
      },
      last_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: Math.random() * 1000,
      },
      last_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Stock",
      tableName: "stocks",
      timestamps: false,
    },
  );

  return Stock;
};
