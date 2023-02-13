const Users = require('./Users');
const Watchlist = require('./Watchlist');
const Stocks = require('./Stocks');

Watchlist.hasMany(Users, {
    foreignKey:'userID',
});
Users.belongsTo(Watchlist, {
    foreignKey:'userID',
});

Watchlist.hasMany(Stocks,{
    foreignKey:"stockSymbol",
});
Stocks.belongsTo(Watchlist,{
    foreignKey:'stockSymbol'
});

module.exports = {Users, Watchlist, Stocks};
