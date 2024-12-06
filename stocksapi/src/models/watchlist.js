import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Watchlist extends Model {
    static associate(models) {
      Watchlist.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Watchlist.belongsToMany(models.Stock, {
        through: 'watchlist_stocks',
        foreignKey: 'watchlist_id',
        timestamps: false,
      });
    }
  }

  Watchlist.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Watchlist',
    tableName: 'watchlists',
    timestamps: false
  });

  return Watchlist;
};
