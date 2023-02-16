const { UserPortfolio } = require('../models');

const userPortfolioData = [
    {
        user:1,
        ticker: `A`,
        shares: 4,
        price: 12450,
    },{
        user:1,
        ticker: `MSFT`,
        shares: 2,
        price: 26310,
    },{
        user:1,
        ticker: `T`,
        shares: 3,
        price: 1907,
    },{
        user:1,
        ticker: `INTC`,
        shares: 1,
        price: 2780,
    },{
        user:2,
        ticker: `AMD`,
        shares: 5,
        price: 8148,
    },{
        user:2,
        ticker: `INTC`,
        shares: 2,
        price: 2780,
    },
];
const seedUserPortfolio = () => UserPortfolio.bulkCreate(userPortfolioData);
module.exports = seedUserPortfolio;