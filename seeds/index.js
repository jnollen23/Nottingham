const sequelize = require('../configuration/config');
const seedUser = require('./userData');
const seedWatchlist = require('./watchlistData');
const seedStocks = require('./stocksData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  await seedStocks();
  await seedWatchlist();

  process.exit(0);
};

seedAll();
