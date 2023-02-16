//router.get('/:ID', async (req, res)


const { User, UserPortfolio, Stocks } = require('../../models');
const router = require('express').Router();
// const Transaction = require('');
// const transactionOptions = require('');

// const Api = require('');


router.post('/', async (req, res) => {
    try {
        let updateBalance = -1;
        const action = req.body.action.toUpperCase();
        const ticker = req.body.ticker.trim().toUpperCase();
        const shares = Number(req.body.shares);
        const user_id = req.body.user_id || req.session.user_id;

        const user = await User.findOne({
            where: {
                id: user_id,
            }
        });

        // Check if quote symbol matches what the user wants
        const stock = await Stocks.findOne({
            where: {
                stockSymbol: ticker
            }
        });

        const userPortfolio = await UserPortfolio.findOne({
            where: {
                user: user_id,
                ticker: ticker
            }
        });

        // If user is buying
        if (action === "BUY") {
            const cost = shares * stock.currentPrice;
            newBalance = user.balance - cost;
            if (newBalance < 0) {
                return res.status(400).json({ error: 'Not enough funds' });
            }

            // Add stock to portfolio
            if (userPortfolio) {
                const newPrice = cost / (shares + userPortfolio.shares) +
                    ((userPortfolio.price * userPortfolio.shares) / (shares + userPortfolio.shares));
                    const newshares = shares + userPortfolio.shares;
                const updatedStock = { shares: newshares, price: newPrice };
                await UserPortfolio.update(updatedStock, {
                    where: {
                        user: user_id,
                        ticker: ticker
                    }
                });
            }
            else {
                const newStock = {
                    user: user_id,
                    ticker: ticker,
                    shares: shares,
                    price: stock.currentPrice
                };
                await UserPortfolio.create(newStock)
            }
            updateBalance = newBalance;
        }

        // If user is selling
        if (action === 'SELL') {
            const cost = shares * stock.currentPrice;
            newBalance = cost + user.balance;

            // Update or delete portfolio shares
            if (userPortfolio.shares > shares) {
                const newshares = userPortfolio.shares - shares
                await userPortfolio.update({shares: newshares});
            }
            else if (userPortfolio.shares === shares) {
                await UserPortfolio.destroy({
                    where: {
                        user: user_id,
                        ticker: ticker
                    }
                });
            }
            else {
                return res.status(400).json({ error: 'Not enough stock' });
            }
             updateBalance = newBalance;
        }

        // Update user's balance
        if (updateBalance > -1) {
            await user.update({balance : updateBalance});
        }
        res.status(200).json({ message: 'sucessfully purchased the stock disered'});
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;
