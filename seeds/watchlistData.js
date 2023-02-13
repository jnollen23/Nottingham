const {Watchlist} = require('../models');

const watchlistData = [
    {
        watchlistID:"Test List 1",
        userID:1,
        stockSymbol:`A`,
    },{
        watchlistID:"Test List 1",
        userID:1,
        stockSymbol:`AA`,
    },{
        watchlistID:"Test List 1",
        userID:1,
        stockSymbol:`AAPL`,
    },{
        watchlistID:"Test List 1",
        userID:1,
        stockSymbol:`A`,
    },{
        watchlistID:"Test List 2",
        userID:1,
        stockSymbol:`AMD`,
    },{
        watchlistID:"Test List 2",
        userID:1,
        stockSymbol:'MSFT',
    },{
        watchlistID:"Test List 2",
        userID:1,
        stockSymbol:`INTC`,
    },{
        watchlistID:"Test List 4",
        userID:1,
        stockSymbol:`AAPL`,
    },{
        watchlistID:"Test List 6",
        userID:1,
        stockSymbol:`AA`,
    },{
        watchlistID:"Test List 6",
        userID:1,
        stockSymbol:`AMD`,
    },{
        watchlistID:"Test List 6",
        userID:1,
        stockSymbol:`T`,
    },
];
const seedWatchlist = () => Watchlist.bulkCreate(watchlistData);
module.exports = seedWatchlist;