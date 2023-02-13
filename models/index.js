const User = require('./user');
const Watchlist = require('./Watchlist');
const Stocks = require('./Stocks');

Watchlist.hasMany(User, {
    foreignKey:'id',
});
User.belongsTo(Watchlist, {
    foreignKey:'id',
});

Watchlist.hasMany(Stocks,{
    foreignKey:"stockSymbol",
});
Stocks.belongsTo(Watchlist,{
    foreignKey:'stockSymbol'
});

module.exports = {User, Watchlist, Stocks};
