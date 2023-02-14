router.get('/:ID', async (req, res)


const User = require('../../models/User');
const userortfolio = require('');
// const Transaction = require('');
// const transactionOptions = require('');

// const Api = require('');

/**
 * @route   POST api/portfolio
 * @desc    Buy and sell stocks
 * @access  Public
 */
router.post('/', auth, async (req, res) => {
  try {
    const action = req.body.action.toUpperCase();
    const ticker = req.body.ticker.trim().toUpperCase();
    const shares = Number(req.body.shares);

    // Check if transaction action is valid
    if (!transactionOptions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Check if shares is a whole number
    if (!Number.isInteger(shares)) {
      return res
        .status(400)
        .json({ error: 'Shares value must be a whole number' });
    }

    const user = await User.findOne({ _id: req.userId });

    // Check if quote symbol matches what the user wants
    const response = await Api.getStockPrice(ticker);

    // Calculate price of shares
    const price = currency(response.data);
    const totalCostOfShares = price.multiply(shares);

    let newBalance = currency(user.balance);

    // If user is buying
    if (action === transactionOptions[0]) {
      newBalance = newBalance.subtract(totalCostOfShares);
      if (newBalance < 0) {
        return res.status(400).json({ error: 'Not enough funds' });
      }

      // Check if user already has shares in the stock
      const userStock = await Portfolio.findOneAndUpdate(
        { user: ObjectId(req.userId), ticker },
        { $inc: { shares } },
      );

      // Add stock to portfolio
      if (!userStock) {
        await new Portfolio({
          user: ObjectId(req.userId),
          ticker,
          shares,
        }).save();
      }
    }

    // If user is selling
    if (action === transactionOptions[1]) {
      const userStock = await Portfolio.findOne({
        user: ObjectId(req.userId),
        ticker,
      });

      // Does the user own the shares of the stock?
      if (!userStock) {
        return res.status(400).json({ error: `${ticker} stocks not owned` });
      }

      // Does the user have enough shares to trade?
      if (userStock.shares < shares) {
        return res.status(400).json({ error: 'Insufficient shares' });
      }

      newBalance = newBalance.add(totalCostOfShares);

      // Update or delete portfolio shares
      if (userStock.shares > shares) {
        userStock.shares -= shares;
        await userStock.save();
      } else {
        await Portfolio.deleteOne({
          user: ObjectId(req.userId),
          ticker,
        });
      }
    }

    // Update user's balance
    await User.findOneAndUpdate(
      { _id: req.userId },
      { balance: newBalance.value },
    ); // eslint-disable-line no-underscore-dangle

    // Record transaction
    await new Transaction({
      user: ObjectId(req.userId),
      action,
      ticker,
      shares,
      price,
    }).save();

    return res.status(201).end();
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 404
    ) {
      return res.status(400).json({ error: 'Invalid ticker' });
    }

    return res
      .status(500)
      .json({ error: 'Server error. Please try again later' });
  }
});

module.exports = router;
