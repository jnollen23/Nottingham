const router = require('express').Router();
const userRoutes = require('./user-routes');
const watchlistRoutes = require('./watchlist');
const search = require('./user-routes');
const portfolio = require('./portfolio');

router.use('/users', userRoutes);
router.use('/search', search);
router.use('/watchlist',watchlistRoutes);
router.use('/portfolio',portfolio );

module.exports = router;
