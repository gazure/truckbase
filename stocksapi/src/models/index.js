import { basename as _basename, join } from 'path';
import user from './user.js';
import stock from './stock.js';
import watchlist from './watchlist.js';
import watchlistStocks from './watchlistStocks.js';

import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';

const database_url = process.env.DATABASE_URL;
if (!database_url) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const sequelize = new Sequelize(database_url, {
  dialectOptions: {}
});

export const User = user(sequelize);
export const Stock = stock(sequelize);
export const Watchlist = watchlist(sequelize);
export const WatchlistStock = watchlistStocks(sequelize);

User.associate({Watchlist})
Watchlist.associate({Stock, User})
Stock.associate({Watchlist})
