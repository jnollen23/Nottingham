const router = require('express').Router();

const userRoutes = require('./user-routes');
const buysellRoutes = require('./buysell');

router.use('/users', userRoutes);

router.use('/buysell', buysellRoutes);

module.exports = router;
