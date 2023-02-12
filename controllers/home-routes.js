const router = require('express').Router();
const watchlist = require('./watchlist');

router.use('/watchlist', watchlist);

module.exports = router;