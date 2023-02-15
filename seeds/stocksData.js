const { Stocks } = require('../models');

const stocksData = [
    {
        stockSymbol: `A`,
        currentPrice: 12450,
        openPrice: 11001,
        dateOfOpeningPrice: '2023-12-02',
    }, {
        stockSymbol: `AA`,
        currentPrice: 12450,
        openPrice: 11001,
        dateOfOpeningPrice: '2023-12-02',
    }, {
        stockSymbol: `AAPL`,
        currentPrice: 12450,
        openPrice: 11001,
        dateOfOpeningPrice: '2023-12-02',
    }, {
        stockSymbol: `MSFT`,
        currentPrice: 26310,
        openPrice: 26362,
        dateOfOpeningPrice: '2023-12-02',
    }, {
        stockSymbol: `AMD`,
        currentPrice: 8148,
        openPrice: 8221,
        dateOfOpeningPrice: '2023-12-02',
    }, {
        stockSymbol: `T`,
        currentPrice: 1907,
        openPrice: 1897,
        dateOfOpeningPrice: '2023-12-02',
    }, {
        stockSymbol: `INTC`,
        currentPrice: 2780,
        openPrice: 2773,
        dateOfOpeningPrice: '2023-12-02',
    },{
        stockSymbol: `_`,
        currentPrice: 0,
        openPrice: 0,
        dateOfOpeningPrice: '2023-12-02',
    },
];
const seedStocks = () => Stocks.bulkCreate(stocksData);
module.exports = seedStocks;