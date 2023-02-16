const User = require('./user');
const Watchlist = require('./Watchlist');
const Stocks = require('./Stocks');
const UserPortfolio = require('./UserPortfolio')

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

UserPortfolio.hasMany(User, {
    foreignKey:'id',
});
User.belongsTo(UserPortfolio, {
    foreignKey:'id',
});

UserPortfolio.hasMany(Stocks,{
    foreignKey:"stockSymbol",
});
Stocks.belongsTo(UserPortfolio,{
    foreignKey:'stockSymbol'
})

module.exports = {User, Watchlist, Stocks, UserPortfolio};
