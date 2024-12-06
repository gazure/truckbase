import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class WatchlistStock extends Model {
    static associate(models) {
      // This is a junction table, so associations are handled in the main models
    }
  }

  WatchlistStock.init({
    watchlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'watchlists',
        key: 'id'
      }
    },
    stock_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'stocks',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'WatchlistStock',
    tableName: 'watchlist_stocks',
    timestamps: false,
  });

  return WatchlistStock;
};
