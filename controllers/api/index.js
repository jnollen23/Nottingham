const router = require('express').Router();
const userRoutes = require('./user-routes');
const watchlistRoutes = require('./watchlist');

router.use('/users', userRoutes);
router.use('/search'. userRoutes)
router.use('/watchlist',watchlistRoutes);

module.exports = router;
